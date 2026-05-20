const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const upload = require("../middleware/multer");
const authModel = require("../models/auth");
const productsModel = require("../models/products");
const ordersModel = require("../models/orders");
const paymentsModel = require("../models/payments");

const generateOrderID = () => {
    return String(Math.floor(10000000 + Math.random() * 90000000));
};

router.post("/place-order", upload.single("transactionSS"), async (req, res) => {
    const deductedItems = [];

    try {
        const {
            userID,
            sellerID,
            totalAmount,
            coupon,
            discountAmount,
            deliveryCharges,
            finalAmount,
            shippingDetails,
            products,
            paymentMethod,
            gateway,
            transactionID,
            paymentStatus
        } = req.body;

        if (!userID || !sellerID || !finalAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (paymentMethod === "online" && !gateway) {
            return res.status(400).json({ message: "Gateway required for online payment" });
        }

        if (paymentMethod === "online" && !transactionID) {
            return res.status(400).json({ message: "Transaction ID required for online payment" });
        }

        if (paymentMethod === "online" && !req.file) {
            return res.status(400).json({ message: "Transaction screenshot required for online payment" });
        }

        const parsedProducts = typeof products === "string" ? JSON.parse(products) : products;
        const parsedShippingDetails = typeof shippingDetails === "string" ? JSON.parse(shippingDetails) : shippingDetails;

        if (!Array.isArray(parsedProducts) || parsedProducts.length === 0) {
            return res.status(400).json({ message: "Invalid products data" });
        }

        const requiredShippingFields = ["province", "city", "place", "address", "phoneNumber"];
        const missingFields = requiredShippingFields.filter(field => !parsedShippingDetails[field]?.trim());

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing shipping details: ${missingFields.join(", ")}`
            });
        }

        const orderProducts = [];

        for (const item of parsedProducts) {
            const quantity = Number(item.quantity || 0);

            if (!item.productID || quantity < 1) {
                throw new Error("Invalid product in cart");
            }

            if (item.variantID) {
                const updatedProduct = await productsModel.findOneAndUpdate(
                    {
                        productID: item.productID,
                        status: "active",
                        variants: {
                            $elemMatch: {
                                id: item.variantID,
                                stock: { $gte: quantity }
                            }
                        }
                    },
                    {
                        $inc: {
                            "variants.$.stock": -quantity,
                            sold: quantity
                        }
                    },
                    { new: true }
                );

                if (!updatedProduct) {
                    return res.status(400).json({
                        message: `Insufficient stock for "${item.title}"`
                    });
                }

                updatedProduct.stock = updatedProduct.variants.reduce(
                    (sum, v) => sum + Number(v.stock || 0),
                    0
                );
                await updatedProduct.save();

                const variant = updatedProduct.variants.find(v => String(v.id) === String(item.variantID));

                deductedItems.push({
                    productID: item.productID,
                    variantID: item.variantID,
                    quantity
                });

                orderProducts.push({
                    productID: updatedProduct.productID,
                    variantID: item.variantID,
                    brandSlug: updatedProduct.brandSlug,
                    title: updatedProduct.title,
                    slug: updatedProduct.slug,
                    mainImageURL: updatedProduct.mainImageURL,
                    variantImageURL: variant?.imageURL || item.variantImageURL || null,
                    quantity,
                    price: Number(variant?.price || item.price || 0),
                    comparedPrice: Number(variant?.comparedPrice || updatedProduct.comparedPrice || item.comparedPrice || 0),
                    selectedOptions: item.selectedOptions || [],
                    reviewed: false
                });
            } else {
                const updatedProduct = await productsModel.findOneAndUpdate(
                    {
                        productID: item.productID,
                        status: "active",
                        stock: { $gte: quantity }
                    },
                    {
                        $inc: {
                            stock: -quantity,
                            sold: quantity
                        }
                    },
                    { new: true }
                );

                if (!updatedProduct) {
                    return res.status(400).json({
                        message: `Insufficient stock for "${item.title}"`
                    });
                }

                deductedItems.push({
                    productID: item.productID,
                    variantID: null,
                    quantity
                });

                orderProducts.push({
                    productID: updatedProduct.productID,
                    variantID: null,
                    brandSlug: updatedProduct.brandSlug,
                    title: updatedProduct.title,
                    slug: updatedProduct.slug,
                    mainImageURL: updatedProduct.mainImageURL,
                    variantImageURL: null,
                    quantity,
                    price: Number(updatedProduct.price || item.price || 0),
                    comparedPrice: Number(updatedProduct.comparedPrice || item.comparedPrice || 0),
                    selectedOptions: item.selectedOptions || [],
                    reviewed: false
                });
            }
        }

        const orderID = generateOrderID();

        const newOrder = new ordersModel({
            orderID,
            userID,
            sellerID,
            totalAmount: parseFloat(totalAmount) || 0,
            coupon: coupon || null,
            discountAmount: parseFloat(discountAmount) || 0,
            deliveryCharges: parseFloat(deliveryCharges) || 0,
            finalAmount: parseFloat(finalAmount) || 0,
            shippingDetails: parsedShippingDetails,
            products: orderProducts,
            paymentMethod,
            status: "pending",
            paymentStatus: paymentStatus || "pending",
            paymentDetails: paymentMethod === "online" ? {
                gateway,
                transactionID,
                transactionSS: `/uploads/${req.file.filename}`
            } : {},
            statusHistory: [{ status: "pending", timestamp: new Date() }]
        });

        const savedOrder = await newOrder.save();

        const newPayment = new paymentsModel({
            orderID,
            userID,
            sellerID,
            amount: parseFloat(finalAmount),
            paymentMethod,
            gateway: gateway || null,
            transactionID: transactionID || null,
            transactionSS: req.file ? `/uploads/${req.file.filename}` : null,
            status: paymentStatus || "pending"
        });

        await newPayment.save();

        await authModel.findByIdAndUpdate(userID, { cart: [] }, { new: true });

        res.status(201).json({
            message: "Order placed successfully!",
            orderID,
            order: savedOrder
        });
    } catch (error) {
        // Manual rollback because we are not using transaction/session
        for (const item of deductedItems) {
            if (item.variantID) {
                const product = await productsModel.findOneAndUpdate(
                    {
                        productID: item.productID,
                        "variants.id": item.variantID
                    },
                    {
                        $inc: {
                            "variants.$.stock": item.quantity,
                            sold: -item.quantity
                        }
                    },
                    { new: true }
                );

                if (product) {
                    product.stock = product.variants.reduce(
                        (sum, v) => sum + Number(v.stock || 0),
                        0
                    );
                    product.sold = Math.max(0, Number(product.sold || 0));
                    await product.save();
                }
            } else {
                await productsModel.findOneAndUpdate(
                    { productID: item.productID },
                    {
                        $inc: {
                            stock: item.quantity,
                            sold: -item.quantity
                        }
                    }
                );
            }
        }

        console.error("Order placement error:", error.message);

        res.status(500).json({
            message: "Something went wrong. Please try again",
            error: error.message
        });
    }
});

// router.post("/place-order", upload.single("transactionSS"), async (req, res) => {
//     try {
//         const {
//             userID, sellerID, totalAmount, coupon, discountAmount, deliveryCharges, finalAmount,
//             shippingDetails, products, paymentMethod, gateway, transactionID, paymentStatus
//         } = req.body;

//         if (!userID || !sellerID || !finalAmount) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         if (paymentMethod === "online" && !gateway) {
//             return res.status(400).json({ message: "Gateway required for online payment" });
//         }

//         if (paymentMethod === "online" && !transactionID) {
//             return res.status(400).json({ message: "Transaction ID required for online payment" });
//         }

//         if (paymentMethod === "online" && !req.file) {
//             return res.status(400).json({ message: "Transaction screenshot required for online payment" });
//         }

//         const parsedProducts = typeof products === "string" ? JSON.parse(products) : products;
//         const parsedShippingDetails = typeof shippingDetails === "string" ? JSON.parse(shippingDetails) : shippingDetails;

//         if (!Array.isArray(parsedProducts) || parsedProducts.length === 0) {
//             return res.status(400).json({ message: "Invalid products data" });
//         }

//         const requiredShippingFields = ['province', 'city', 'place', 'address', 'phoneNumber'];
//         const missingFields = requiredShippingFields.filter(field => !parsedShippingDetails[field]?.trim());

//         if (missingFields.length > 0) {
//             return res.status(400).json({ message: `Missing shipping details: ${missingFields.join(', ')}` });
//         }

//         const productUpdates = [];

//         for (const item of parsedProducts) {
//             if (!item.productID || !item.quantity) {
//                 return res.status(400).json({ message: "Invalid product in cart" });
//             }

//             const product = await productsModel.findOne({ productID: item.productID });

//             if (!product) {
//                 return res.status(404).json({ message: `Product "${item.title}" not found` });
//             }

//             if (item.variantID) {
//                 const variantIndex = product.variants.findIndex(v => v.id === item.variantID);

//                 if (variantIndex === -1) {
//                     return res.status(404).json({ message: `Variant not found for "${item.title}"` });
//                 }

//                 const variant = product.variants[variantIndex];

//                 if (variant.stock < item.quantity) {
//                     const variantDesc = item.selectedOptions?.map(o => o.optionValue).join(', ') || 'Unknown variant';
//                     return res.status(400).json({
//                         message: `Insufficient stock for "${item.title}" - ${variantDesc}. Available: ${variant.stock}, Requested: ${item.quantity}`
//                     });
//                 }

//                 productUpdates.push({
//                     productId: product._id,
//                     productID: item.productID,
//                     variantID: item.variantID,
//                     variantIndex,
//                     quantity: item.quantity,
//                     title: item.title
//                 });
//             } else {
//                 if (product.stock < item.quantity) {
//                     return res.status(400).json({
//                         message: `Insufficient stock for "${item.title}". Available: ${product.stock}, Requested: ${item.quantity}`
//                     });
//                 }

//                 productUpdates.push({
//                     productId: product._id,
//                     productID: item.productID,
//                     variantID: null,
//                     quantity: item.quantity,
//                     title: item.title
//                 });
//             }
//         }

//         const orderID = generateOrderID();

//         const orderProducts = parsedProducts.map(item => ({
//             productID: item.productID,
//             variantID: item.variantID || null,
//             brandSlug: item.brandSlug,
//             title: item.title,
//             slug: item.slug,
//             mainImageURL: item.mainImageURL,
//             variantImageURL: item.variantImageURL || null,
//             quantity: item.quantity,
//             price: item.price,
//             comparedPrice: item.comparedPrice,
//             selectedOptions: item.selectedOptions || [],
//             reviewed: false
//         }));

//         const newOrder = new ordersModel({
//             orderID,
//             userID,
//             sellerID,
//             totalAmount: parseFloat(totalAmount) || 0,
//             coupon: coupon || null,
//             discountAmount: parseFloat(discountAmount) || 0,
//             deliveryCharges: parseFloat(deliveryCharges) || 0,
//             finalAmount: parseFloat(finalAmount) || 0,
//             shippingDetails: parsedShippingDetails,
//             products: orderProducts,
//             paymentMethod,
//             status: "pending",
//             paymentStatus: paymentStatus || "pending",
//             paymentDetails: paymentMethod === "online" ? {
//                 gateway: gateway,
//                 transactionID: transactionID,
//                 transactionSS: `/uploads/${req.file.filename}`
//             } : {},
//             statusHistory: [{ status: 'pending', timestamp: new Date() }]
//         });

//         const savedOrder = await newOrder.save();

//         const newPayment = new paymentsModel({
//             orderID,
//             userID,
//             sellerID,
//             amount: parseFloat(finalAmount),
//             paymentMethod,
//             gateway: gateway || null,
//             transactionID: transactionID || null,
//             transactionSS: req.file ? `/uploads/${req.file.filename}` : null,
//             status: paymentStatus || "pending"
//         });

//         await newPayment.save();

//         await authModel.findByIdAndUpdate(userID, { cart: [] }, { new: true });

//         for (const update of productUpdates) {
//             const product = await productsModel.findById(update.productId);

//             if (!product) {
//                 return res.status(404).json({ message: `Product not found: ${update.title}` });
//             }

//             if (update.variantID) {
//                 const variant = product.variants[update.variantIndex];

//                 if (!variant) {
//                     return res.status(404).json({ message: `Variant not found for: ${update.title}` });
//                 }

//                 product.variants[update.variantIndex].stock -= update.quantity;

//                 if (product.variants[update.variantIndex].stock < 0) {
//                     return res.status(400).json({ message: `Stock update failed for: ${update.title}` });
//                 }

//                 product.stock = product.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
//             } else {
//                 product.stock -= update.quantity;

//                 if (product.stock < 0) {
//                     return res.status(400).json({ message: `Stock update failed for: ${update.title}` });
//                 }
//             }

//             product.sold = (product.sold || 0) + update.quantity;
//             await product.save();
//         }

//         res.status(201).json({ message: "Order placed successfully!", orderID, order: savedOrder });
//     } catch (error) {
//         console.error("Order placement error:", error.message);
//         res.status(500).json({ message: "Something went wrong. Please try again", error: error.message });
//     }
// });

// module.exports = router;

// router.post("/place-order", upload.single("transactionSS"), async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const {
//             userID, sellerID, totalAmount, coupon, discountAmount, deliveryCharges, finalAmount,
//             shippingDetails, products, paymentMethod, gateway, transactionID, paymentStatus
//         } = req.body;

//         if (!userID || !sellerID || !finalAmount) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         if (paymentMethod === "online" && !gateway) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: "Gateway required for online payment" });
//         }

//         if (paymentMethod === "online" && !transactionID) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: "Transaction ID required for online payment" });
//         }

//         if (paymentMethod === "online" && !req.file) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: "Transaction screenshot required for online payment" });
//         }

//         const parsedProducts = typeof products === "string" ? JSON.parse(products) : products;
//         const parsedShippingDetails = typeof shippingDetails === "string" ? JSON.parse(shippingDetails) : shippingDetails;

//         if (!Array.isArray(parsedProducts) || parsedProducts.length === 0) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: "Invalid products data" });
//         }

//         const requiredShippingFields = ['province', 'city', 'place', 'address', 'phoneNumber'];
//         const missingFields = requiredShippingFields.filter(field => !parsedShippingDetails[field]?.trim());

//         if (missingFields.length > 0) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: `Missing shipping details: ${missingFields.join(', ')}` });
//         }

//         // Stock validation map - stores product updates
//         const productUpdates = [];

//         // Validate all products and variants
//         for (const item of parsedProducts) {
//             if (!item.productID || !item.quantity) {
//                 await session.abortTransaction();
//                 return res.status(400).json({ message: "Invalid product in cart" });
//             }

//             const product = await productsModel.findOne({ productID: item.productID }).session(session);

//             if (!product) {
//                 await session.abortTransaction();
//                 return res.status(404).json({ message: `Product "${item.title}" not found` });
//             }

//             // Check if product has variants
//             if (item.variantID) {
//                 const variantIndex = product.variants.findIndex(v => v.id === item.variantID);

//                 if (variantIndex === -1) {
//                     await session.abortTransaction();
//                     return res.status(404).json({
//                         message: `Variant not found for "${item.title}"`
//                     });
//                 }

//                 const variant = product.variants[variantIndex];

//                 // Validate variant stock
//                 if (variant.stock < item.quantity) {
//                     await session.abortTransaction();
//                     const variantDesc = item.selectedOptions?.map(o => o.optionValue).join(', ') || 'Unknown variant';
//                     return res.status(400).json({
//                         message: `Insufficient stock for "${item.title}" - ${variantDesc}. Available: ${variant.stock}, Requested: ${item.quantity}`
//                     });
//                 }

//                 // Store update info
//                 productUpdates.push({
//                     productId: product._id,
//                     productID: item.productID,
//                     variantID: item.variantID,
//                     variantIndex, //Index for direct variant access
//                     quantity: item.quantity,
//                     title: item.title
//                 });
//             } else {
//                 // Product without variants
//                 if (product.stock < item.quantity) {
//                     await session.abortTransaction();
//                     return res.status(400).json({
//                         message: `Insufficient stock for "${item.title}". Available: ${product.stock}, Requested: ${item.quantity}`
//                     });
//                 }

//                 // Store update info
//                 productUpdates.push({
//                     productId: product._id,
//                     productID: item.productID,
//                     variantID: null,
//                     quantity: item.quantity,
//                     title: item.title
//                 });
//             }
//         }

//         const orderID = generateOrderID();

//         const orderProducts = parsedProducts.map(item => ({
//             productID: item.productID,
//             variantID: item.variantID || null,
//             brandSlug: item.brandSlug,
//             title: item.title,
//             slug: item.slug,
//             mainImageURL: item.mainImageURL,
//             variantImageURL: item.variantImageURL || null,
//             quantity: item.quantity,
//             price: item.price,
//             comparedPrice: item.comparedPrice,
//             selectedOptions: item.selectedOptions || [],
//             reviewed: false
//         }));

//         // Create order
//         const newOrder = new ordersModel({
//             orderID,
//             userID,
//             sellerID,
//             totalAmount: parseFloat(totalAmount) || 0,
//             coupon: coupon || null,
//             discountAmount: parseFloat(discountAmount) || 0,
//             deliveryCharges: parseFloat(deliveryCharges) || 0,
//             finalAmount: parseFloat(finalAmount) || 0,
//             shippingDetails: parsedShippingDetails,
//             products: orderProducts,
//             paymentMethod,
//             status: "pending",
//             paymentStatus: paymentStatus || "pending",
//             paymentDetails: paymentMethod === "online" ? {
//                 gateway: gateway,
//                 transactionID: transactionID,
//                 transactionSS: `/uploads/${req.file.filename}`
//             } : {}
//         });

//         const savedOrder = await newOrder.save({ session });

//         const newPayment = new paymentsModel({
//             orderID,
//             userID,
//             sellerID,
//             amount: parseFloat(finalAmount),
//             paymentMethod,
//             gateway: gateway || null,
//             transactionID: transactionID || null,
//             transactionSS: req.file ? `/uploads/${req.file.filename}` : null,
//             status: paymentStatus || "pending"
//         });

//         await newPayment.save({ session });

//         await authModel.findByIdAndUpdate(userID, { cart: [] }, { new: true, session })

//         // Update stock for all products
//         for (const update of productUpdates) {
//             const product = await productsModel.findById(update.productId).session(session);

//             if (!product) {
//                 await session.abortTransaction();
//                 return res.status(404).json({
//                     message: `Product not found: ${update.title}`
//                 });
//             }

//             if (update.variantID) {
//                 // Update variant stock
//                 const variant = product.variants[update.variantIndex];

//                 if (!variant) {
//                     await session.abortTransaction();
//                     return res.status(404).json({
//                         message: `Variant not found for: ${update.title}`
//                     });
//                 }

//                 // Decrement variant stock
//                 product.variants[update.variantIndex].stock -= update.quantity;

//                 // Ensure variant stock doesn't go negative
//                 if (product.variants[update.variantIndex].stock < 0) {
//                     await session.abortTransaction();
//                     return res.status(400).json({
//                         message: `Stock update failed for: ${update.title}`
//                     });
//                 }

//                 // Recalculate total product stock (sum of all variant stocks)
//                 product.stock = product.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
//             } else {
//                 // Update base product stock
//                 product.stock -= update.quantity;

//                 // Ensure stock doesn't go negative
//                 if (product.stock < 0) {
//                     await session.abortTransaction();
//                     return res.status(400).json({ message: `Stock update failed for: ${update.title}` });
//                 }
//             }

//             // Increment sold count
//             product.sold = (product.sold || 0) + update.quantity;

//             // Save updated product
//             await product.save({ session });
//         }

//         await session.commitTransaction();

//         res.status(201).json({ message: "Order placed successfully!", orderID, order: savedOrder });
//     } catch (error) {
//         await session.abortTransaction();
//         console.error("Order placement error:", error.message);
//         res.status(500).json({ message: "Something went wrong. Please try again", error: error.message });
//     } finally {
//         session.endSession();
//     }
// });

module.exports = router
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const settingsModel = require("../models/settings");
const ordersModel = require("../models/orders");
const productsModel = require("../models/products");

router.get("/fetch-order", async (req, res) => {
    try {
        const { sellerID, orderID } = req.query

        const order = await ordersModel.findOne({ orderID, sellerID }).populate("userID")
        const settingsContent = await settingsModel.findOne({ sellerID }).select("content.currency")

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order fetched', order, currency: settingsContent.content.currency })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.put("/update-status", async (req, res) => {
    try {
        const { sellerID, orderID, status } = req.body;

        const order = await ordersModel.findOne({ orderID, sellerID }).populate("userID");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const isCancelOrReturn = status === "cancelled" || status === "returned";
        const wasCancelOrReturn = order.status === "cancelled" || order.status === "returned";

        const shouldRestoreStock = isCancelOrReturn && !wasCancelOrReturn;
        const shouldDeductStock = !isCancelOrReturn && wasCancelOrReturn;

        if (Array.isArray(order.products)) {
            for (const item of order.products) {
                const product = await productsModel.findOne({ productID: item.productID });

                if (!product) continue;

                const quantity = Number(item.quantity || 0);
                const isVariantOrder = item.variantID && product.variants?.length > 0;

                if (isVariantOrder) {
                    const variantIndex = product.variants.findIndex(
                        v => String(v.id) === String(item.variantID)
                    );

                    if (variantIndex !== -1) {
                        if (shouldRestoreStock) {
                            product.variants[variantIndex].stock += quantity;
                            product.sold = Math.max(0, Number(product.sold || 0) - quantity);
                        }

                        if (shouldDeductStock) {
                            if (Number(product.variants[variantIndex].stock || 0) < quantity) {
                                return res.status(400).json({
                                    message: `Insufficient stock to reactivate order for "${item.title}"`
                                });
                            }

                            product.variants[variantIndex].stock -= quantity;
                            product.sold = Number(product.sold || 0) + quantity;
                        }

                        product.stock = product.variants.reduce(
                            (sum, v) => sum + Number(v.stock || 0),
                            0
                        );
                    }
                } else {
                    if (shouldRestoreStock) {
                        product.stock += quantity;
                        product.sold = Math.max(0, Number(product.sold || 0) - quantity);
                    }

                    if (shouldDeductStock) {
                        if (Number(product.stock || 0) < quantity) {
                            return res.status(400).json({
                                message: `Insufficient stock to reactivate order for "${item.title}"`
                            });
                        }

                        product.stock -= quantity;
                        product.sold = Number(product.sold || 0) + quantity;
                    }
                }

                await product.save();
            }
        }

        order.status = status;

        const alreadyTracked = order.statusHistory?.some(h => h.status === status);
        if (!alreadyTracked) {
            order.statusHistory.push({ status, timestamp: new Date() });
        }

        await order.save();

        res.status(202).json({
            message: "Order status updated",
            order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.put("/update-status", async (req, res) => {
//     try {
//         const { sellerID, orderID, status } = req.body;

//         const order = await ordersModel.findOne({ orderID, sellerID }).populate("userID");

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         const isCancelOrReturn = status === "cancelled" || status === "returned";
//         const wasCancelOrReturn = order.status === "cancelled" || order.status === "returned";

//         const shouldRestoreStock = isCancelOrReturn && !wasCancelOrReturn;
//         const shouldDeductStock = !isCancelOrReturn && wasCancelOrReturn;

//         if (Array.isArray(order.products)) {
//             for (const item of order.products) {
//                 const product = await productsModel.findOne({ productID: item.productID });

//                 if (!product) continue;

//                 const isVariantOrder = item.variantID && product.variants?.length > 0;

//                 if (isVariantOrder) {
//                     const variantIndex = product.variants.findIndex(v => v.id === item.variantID);

//                     if (variantIndex !== -1) {
//                         if (shouldRestoreStock) {
//                             product.variants[variantIndex].stock += item.quantity;
//                             product.sold -= item.quantity;
//                         } else if (shouldDeductStock) {
//                             product.variants[variantIndex].stock -= item.quantity;
//                             product.sold += item.quantity;
//                         }
//                     }
//                 } else {
//                     if (shouldRestoreStock) {
//                         product.stock += item.quantity;
//                         product.sold -= item.quantity;
//                     } else if (shouldDeductStock) {
//                         product.stock -= item.quantity;
//                         product.sold += item.quantity;
//                     }
//                 }

//                 await product.save();
//             }
//         }

//         order.status = status;

//         const alreadyTracked = order.statusHistory?.some(h => h.status === status);
//         if (!alreadyTracked) {
//             order.statusHistory.push({ status, timestamp: new Date() });
//         }

//         await order.save();

//         res.status(202).json({ message: 'Order status updated', order });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router;

// router.put("/update-status", async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const { sellerID, orderID, status } = req.body

//         const order = await ordersModel.findOne({ orderID, sellerID }).session(session);

//         if (!order) {
//             await session.abortTransaction();
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         const isCancelOrReturn = status === "cancelled" || status === "returned";
//         const wasCancelOrReturn = order.status === "cancelled" || order.status === "returned";

//         // Restore stock if order now being cancelled/returned for the first time
//         const shouldRestoreStock = isCancelOrReturn && !wasCancelOrReturn;

//         // Deduct stock again if order was cancelled/returned before but is now reactivated
//         const shouldDeductStock = !isCancelOrReturn && wasCancelOrReturn;

//         if (Array.isArray(order.products)) {
//             for (const item of order.products) {
//                 const product = await productsModel.findOne({ productID: item.productID }).session(session);

//                 if (!product) continue;

//                 const isVariantOrder = item.variantID && product.variants?.length > 0;

//                 if (isVariantOrder) {
//                     // Find correct variant
//                     const variantIndex = product.variants.findIndex(v => v.id === item.variantID);

//                     if (variantIndex !== -1) {
//                         if (shouldRestoreStock) {
//                             product.variants[variantIndex].stock += item.quantity;
//                             product.sold -= item.quantity; // Update MAIN sold
//                         }
//                         else if (shouldDeductStock) {
//                             product.variants[variantIndex].stock -= item.quantity;
//                             product.sold += item.quantity; // Update MAIN sold
//                         }
//                     }
//                 }
//                 else {
//                     // Product without variants
//                     if (shouldRestoreStock) {
//                         product.stock += item.quantity;
//                         product.sold -= item.quantity;
//                     }
//                     else if (shouldDeductStock) {
//                         product.stock -= item.quantity;
//                         product.sold += item.quantity;
//                     }
//                 }

//                 await product.save({ session });
//             }
//         }

//         order.status = status;
//         await order.save({ session });

//         await session.commitTransaction();
//         res.status(202).json({ message: 'Order status updated', order })
//     }
//     catch (error) {
//         await session.abortTransaction();
//         res.status(500).json({ message: error.message })
//     } finally {
//         session.endSession();
//     }
// });

module.exports = router
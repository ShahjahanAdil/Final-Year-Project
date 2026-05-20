const express = require("express");
const router = express.Router();

const authModel = require("../models/auth");
const productsModel = require("../models/products");
const reviewsModel = require("../models/reviews");

router.get("/fetch-product", async (req, res) => {
    try {
        const { sellerID, productSlug } = req.query
        if (!sellerID) {
            return res.status(400).json({ message: "sellerID is required" });
        }

        const product = await productsModel.findOne({ sellerID, slug: productSlug, status: "active" })
            .populate("sizeChart")
            .populate("boughtTogether")

        res.status(200).json({ message: 'Product fetched', product })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
});

router.get("/fetch-similar-products", async (req, res) => {
    try {
        const { sellerID, productSlug, category, subcategory } = req.query
        if (!sellerID) return res.status(400).json({ message: "sellerID is required" });

        const searchConditions = [];

        if (category) {
            searchConditions.push(
                { title: { $regex: category, $options: "i" } },
                { tags: { $regex: category, $options: "i" } },
                { category: { $regex: category, $options: "i" } },
            );
        }

        if (subcategory) {
            searchConditions.push(
                { title: { $regex: subcategory, $options: "i" } },
                { tags: { $regex: subcategory, $options: "i" } },
                { subcategory: { $regex: subcategory, $options: "i" } }
            );
        }

        const searchQuery = {
            sellerID,
            status: "active",
            $or: searchConditions,
            productSlug: { $ne: productSlug }
        };

        const products = await productsModel.find(searchQuery).sort({ createdAt: -1 }).limit(12)

        res.status(200).json({ message: 'Similar products fetched', products })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
});

// router.post("/add-to-cart", async (req, res) => {
//     try {
//         const { userID } = req.query
//         const data = req.body;

//         if (!userID) return res.status(400).json({ message: "userID is required" });

//         const user = await authModel.findById(userID)
//         if (!user) return res.status(404).json({ message: "User is not found" });

//         if (!data.productID) {
//             return res.status(400).json({ message: "productID is required" });
//         }

//         // Check if same product + variant combination already exists in cart
//         const existingItemIndex = user.cart.findIndex(item => {
//             // For products without variants
//             if (!data.variantID && !item.variantID) {
//                 return item.productID === data.productID;
//             }
//             // For products with variants
//             return item.productID === data.productID && item.variantID === data.variantID;
//         });

//         if (existingItemIndex !== -1) {
//             const existingItem = user.cart[existingItemIndex];
//             const newQuantity = existingItem.quantity + (data.quantity || 1);

//             if (newQuantity > data.stock) {
//                 return res.status(400).json({
//                     message: `Cannot add more. Only ${data.stock} units available.`
//                 });
//             }

//             user.cart[existingItemIndex].quantity = newQuantity;
//             await user.save();

//             return res.status(201).json({ message: "Cart updated!", cart: user.cart });
//         }

//         if (data.quantity > data.stock) {
//             return res.status(400).json({ message: `${data.stock > 0 ? `Only ${data.stock} units available.` : "Out of stock"}` });
//         }

//         const cartItem = {
//             productID: data.productID,
//             variantID: data.variantID || null,
//             brandSlug: data.brandSlug,
//             title: data.title,
//             slug: data.slug,
//             mainImageURL: data.mainImageURL,
//             variantImageURL: data.variantImageURL || null,
//             quantity: data.quantity || 1,
//             price: data.price,
//             comparedPrice: data.comparedPrice,
//             stock: data.stock,
//             selectedOptions: data.selectedOptions || []
//         };

//         user.cart.push(cartItem);
//         await user.save();

//         res.status(201).json({ message: "Product added to cart!", cart: user.cart });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.post("/add-to-cart", async (req, res) => {
    try {
        const { userID } = req.query;
        const data = req.body;

        if (!userID) {
            return res.status(400).json({ message: "userID is required" });
        }

        if (!data.productID) {
            return res.status(400).json({ message: "productID is required" });
        }

        const user = await authModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User is not found" });
        }

        const product = await productsModel.findOne({
            productID: data.productID,
            status: "active"
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const requestedQuantity = Number(data.quantity || 1);

        if (!Number.isFinite(requestedQuantity) || requestedQuantity < 1) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        let realStock = Number(product.stock || 0);
        let realPrice = Number(product.price || 0);
        let realComparedPrice = Number(product.comparedPrice || 0);
        let realVariantImageURL = null;

        if (data.variantID) {
            const variant = product.variants?.find(v => String(v.id) === String(data.variantID));

            if (!variant) {
                return res.status(404).json({ message: "Selected variant not found" });
            }

            realStock = Number(variant.stock || 0);
            realPrice = Number(variant.price || 0);
            realComparedPrice = Number(variant.comparedPrice || product.comparedPrice || 0);
            realVariantImageURL = variant.imageURL || product.mainImageURL || null;
        }

        if (realStock <= 0) {
            return res.status(400).json({ message: "Product is out of stock" });
        }

        const existingItemIndex = user.cart.findIndex(item =>
            item.productID === data.productID &&
            String(item.variantID || "") === String(data.variantID || "")
        );

        if (existingItemIndex !== -1) {
            const existingItem = user.cart[existingItemIndex];
            const newQuantity = Number(existingItem.quantity || 0) + requestedQuantity;

            if (newQuantity > realStock) {
                return res.status(400).json({
                    message: `Cannot add more. Only ${realStock} unit(s) available.`
                });
            }

            user.cart[existingItemIndex].quantity = newQuantity;
            user.cart[existingItemIndex].stock = realStock;
            user.cart[existingItemIndex].price = realPrice;
            user.cart[existingItemIndex].comparedPrice = realComparedPrice;
            user.cart[existingItemIndex].variantImageURL = realVariantImageURL;

            await user.save();

            return res.status(201).json({
                message: "Cart updated!",
                cart: user.cart
            });
        }

        if (requestedQuantity > realStock) {
            return res.status(400).json({
                message: `Only ${realStock} unit(s) available.`
            });
        }

        const cartItem = {
            productID: product.productID,
            variantID: data.variantID || null,
            brandSlug: product.brandSlug,
            title: product.title,
            slug: product.slug,
            mainImageURL: product.mainImageURL,
            variantImageURL: realVariantImageURL,
            quantity: requestedQuantity,
            price: realPrice,
            comparedPrice: realComparedPrice,
            stock: realStock,
            selectedOptions: data.selectedOptions || []
        };

        user.cart.push(cartItem);
        await user.save();

        res.status(201).json({
            message: "Product added to cart!",
            cart: user.cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/fetch-reviews", async (req, res) => {
    try {
        const { productID } = req.query;

        const reviews = await reviewsModel.find({ productID }).sort({ createdAt: -1 })
            .populate("userID", "username")

        res.status(200).json({ message: "Reviews fetched", reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router
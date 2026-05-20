const express = require("express");
const router = express.Router();

const categoriesModel = require("../models/categories");
const productsModel = require("../models/products");

router.get("/fetch-categories", async (req, res) => {
    try {
        const { sellerID } = req.query
        const categories = await categoriesModel.find({ sellerID })

        res.status(200).json({ message: 'Categories fetched', categories })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
});

router.get("/fetch-products", async (req, res) => {
    try {
        const { sellerID, category, subcategory, minPrice, maxPrice, searchText } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        if (!sellerID) return res.status(400).json({ message: "sellerID is required" });

        let filter = { sellerID, status: "active" };

        if (category && subcategory) {
            filter.category = category.trim();
            filter.subcategory = subcategory.trim();
        } else if (category) {
            filter.category = category.trim();
        }

        if (minPrice || maxPrice) {
            filter.discountedPrice = {};

            if (minPrice && !isNaN(minPrice) && minPrice !== "") {
                filter.discountedPrice.$gte = Number(minPrice);
            }

            if (maxPrice && !isNaN(maxPrice) && maxPrice !== "") {
                filter.discountedPrice.$lte = Number(maxPrice);
            }

            if (Object.keys(filter.discountedPrice).length === 0) {
                delete filter.discountedPrice;
            }
        }

        const text = searchText?.trim()?.toLowerCase();
        const usedAsCategory = text === category?.toLowerCase();
        const usedAsSubcategory = text === subcategory?.toLowerCase();

        if (text && !usedAsCategory && !usedAsSubcategory) {
            const wordRegex = new RegExp(`\\b${text}\\b`, "i");

            filter.$or = [
                { title: { $regex: text, $options: "i" } },
                { description: { $regex: text, $options: "i" } },
                { tags: { $regex: text, $options: "i" } },
                { category: { $regex: wordRegex } },
                { subcategory: { $regex: wordRegex } },
            ];
        }

        const products = await productsModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalProducts = await productsModel.countDocuments(filter);

        res.status(200).json({ message: "Products fetched successfully", products, totalProducts, });
    } catch (error) {
        console.error("Fetch products error:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router
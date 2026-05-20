const express = require("express");
const router = express.Router();

const sellersModel = require("../models/sellers");

router.get("/all", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const skip = (page - 1) * limit

        const sellers = await sellersModel.find({ status: 'pending' }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalSellers = await sellersModel.countDocuments({ status: 'pending' })

        res.status(200).json({ message: 'Sellers fetched', sellers, totalSellers })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
});

router.get("/search", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const searchText = req.query.searchText
        const limit = 20
        const skip = (page - 1) * limit

        const query = {
            status: 'pending',
            $or: [
                { userID: { $regex: searchText, $options: "i" } },
                { username: { $regex: searchText, $options: "i" } },
                { email: { $regex: searchText, $options: "i" } }
            ]
        };

        const searchedSellers = await sellersModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalSearchedSellers = await sellersModel.countDocuments(query)

        res.status(200).json({ message: 'Sellers searched', searchedSellers, totalSearchedSellers })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
});

router.put("/update-status/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const updateData = { status };

        if (status === "approved") {
            const now = new Date();
            const trialEndsAt = new Date();
            trialEndsAt.setDate(trialEndsAt.getDate() + 7);

            updateData.subscriptionStatus = "trial";
            updateData.plan = "Trial";
            updateData.trialStartedAt = now;
            updateData.trialEndsAt = trialEndsAt;
            updateData.subscriptionStartedAt = now;
            updateData.subscriptionEndsAt = trialEndsAt;
        }

        await sellersModel.findByIdAndUpdate(id, updateData, { new: true });

        res.status(202).json({ message: "Seller status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await sellersModel.findByIdAndDelete(id);

        res.status(203).json({ message: "Seller deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router
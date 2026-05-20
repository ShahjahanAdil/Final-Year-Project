const express = require("express");
const router = express.Router();

const authModel = require("../models/auth");
const sellersModel = require("../models/sellers");
const subscriptionsModel = require("../models/subscriptions");

router.get("/analytics", async (req, res) => {
    try {
        const [
            totalUsers,
            totalSellers,
            approvedSellers,
            pendingSellers,
            bannedSellers,
            activeSubscriptions,
            pendingSubscriptions,
            rejectedSubscriptions,
            expiredSubscriptions,
            revenueResult,
            recentSellers,
            recentSubscriptions,
        ] = await Promise.all([
            authModel.countDocuments({ role: "user" }),
            sellersModel.countDocuments(),
            sellersModel.countDocuments({ status: "approved" }),
            sellersModel.countDocuments({ status: "pending" }),
            sellersModel.countDocuments({ status: "banned" }),

            subscriptionsModel.countDocuments({ status: "approved" }),
            subscriptionsModel.countDocuments({ status: "pending" }),
            subscriptionsModel.countDocuments({ status: "rejected" }),
            subscriptionsModel.countDocuments({ status: "expired" }),

            subscriptionsModel.aggregate([
                {
                    $match: {
                        status: "approved",
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: "$amount" },
                    },
                },
            ]),

            sellersModel
                .find()
                .select("userID fullname username email brandName brandSlug status plan subscriptionStatus createdAt")
                .sort({ createdAt: -1 })
                .limit(5),

            subscriptionsModel
                .find()
                .populate("sellerID", "brandName username email")
                .sort({ createdAt: -1 })
                .limit(5),
        ]);

        const totalSubscriptionRevenue = revenueResult[0]?.totalRevenue || 0;

        res.status(200).json({
            message: "Dashboard analytics fetched successfully",
            analytics: {
                totalUsers,
                totalSellers,
                approvedSellers,
                pendingSellers,
                bannedSellers,
                activeSubscriptions,
                pendingSubscriptions,
                rejectedSubscriptions,
                expiredSubscriptions,
                totalSubscriptionRevenue,
                recentSellers,
                recentSubscriptions,
            },
        });
    } catch (error) {
        console.error("Admin dashboard analytics error:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
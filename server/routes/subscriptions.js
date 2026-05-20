const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const sellersModel = require("../models/sellers");
const subscriptionsModel = require("../models/subscriptions");

const PLANS = {
    Basic: {
        plan: "Basic",
        amount: 2000,
        durationDays: 30,
    },
    Advanced: {
        plan: "Advanced",
        amount: 4000,
        durationDays: 30,
    },
};

const BANK_ACCOUNTS = [
    {
        bankName: "JazzCash",
        accountTitle: "JazzCash",
        accountName: "JazzCash",
        accountNumber: "0300-0000000",
        iban: null,
    },
    {
        bankName: "Meezan Bank",
        accountTitle: "Meezan Bank",
        accountName: "Meezan Bank",
        accountNumber: "0000-0000000000",
        iban: "PK00MEZN0000000000000000",
    },
    {
        bankName: "EasyPaisa",
        accountTitle: "EasyPaisa",
        accountName: "EasyPaisa",
        accountNumber: "0311-0000000",
        iban: null,
    },
];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/subscriptions");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const refreshSellerSubscriptionStatus = async (seller) => {
    const now = new Date();

    if (
        seller.subscriptionStatus !== "expired" &&
        seller.subscriptionEndsAt &&
        new Date(seller.subscriptionEndsAt) < now
    ) {
        seller.subscriptionStatus = "expired";
        seller.plan = null;
        await seller.save();
    }

    return seller;
};

router.get("/plans", (req, res) => {
    res.status(200).json({
        message: "Plans fetched",
        plans: Object.values(PLANS),
    });
});

router.get("/bank-accounts", (req, res) => {
    res.status(200).json({
        message: "Bank accounts fetched",
        bankAccounts: BANK_ACCOUNTS,
    });
});

router.post("/purchase", upload.single("transactionScreenshot"), async (req, res) => {
    try {
        const {
            sellerID,
            plan,
            bankName,
            accountTitle,
            accountName,
            accountNumber,
            iban,
            transactionID,
        } = req.body;

        if (!sellerID || !plan || !transactionID) {
            return res.status(400).json({ message: "Seller, plan and transaction ID are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Transaction screenshot is required" });
        }

        const selectedPlan = PLANS[plan];

        if (!selectedPlan) {
            return res.status(400).json({ message: "Invalid plan selected" });
        }

        const seller = await sellersModel.findById(sellerID);

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        const subscription = await subscriptionsModel.create({
            sellerID,
            plan: selectedPlan.plan,
            amount: selectedPlan.amount,
            durationDays: selectedPlan.durationDays,
            selectedBank: {
                bankName,
                accountTitle,
                accountName,
                accountNumber,
                iban: iban || null,
            },
            transactionID,
            transactionScreenshot: `/uploads/subscriptions/${req.file.filename}`,
            status: "pending",
        });

        res.status(201).json({
            message: "Subscription request submitted successfully. Please wait for admin approval.",
            subscription,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get("/seller/:sellerID", async (req, res) => {
    try {
        const { sellerID } = req.params;

        let seller = await sellersModel.findById(sellerID).select(
            "brandName plan subscriptionStatus trialStartedAt trialEndsAt subscriptionStartedAt subscriptionEndsAt"
        );

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        seller = await refreshSellerSubscriptionStatus(seller);

        const subscriptions = await subscriptionsModel
            .find({ sellerID })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Seller subscriptions fetched",
            seller,
            subscriptions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get("/admin/all", async (req, res) => {
    try {
        const subscriptions = await subscriptionsModel
            .find()
            .populate("sellerID", "userID username email brandName brandSlug")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Subscriptions fetched",
            subscriptions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/admin/approve/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const subscription = await subscriptionsModel.findById(id);

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        if (subscription.status === "approved") {
            return res.status(400).json({ message: "Subscription already approved" });
        }

        const now = new Date();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + subscription.durationDays);

        await subscriptionsModel.updateMany(
            {
                sellerID: subscription.sellerID,
                status: "approved",
            },
            {
                status: "expired",
            }
        );

        subscription.status = "approved";
        subscription.startedAt = now;
        subscription.expiresAt = expiresAt;
        subscription.reviewedAt = now;
        subscription.adminNotes = null;

        await subscription.save();

        await sellersModel.findByIdAndUpdate(subscription.sellerID, {
            plan: subscription.plan,
            subscriptionStatus: "active",
            subscriptionStartedAt: now,
            subscriptionEndsAt: expiresAt,
        });

        res.status(202).json({
            message: "Subscription approved successfully",
            subscription,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/admin/reject/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { adminNotes } = req.body;

        if (!adminNotes) {
            return res.status(400).json({ message: "Rejection note is required" });
        }

        const subscription = await subscriptionsModel.findByIdAndUpdate(
            id,
            {
                status: "rejected",
                adminNotes,
                reviewedAt: new Date(),
            },
            { new: true }
        );

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        res.status(202).json({
            message: "Subscription rejected successfully",
            subscription,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get("/store-status", async (req, res) => {
    try {
        const { brandSlug, domain } = req.query;

        let seller;

        if (brandSlug) {
            seller = await sellersModel.findOne({ brandSlug });
        } else if (domain) {
            const settingsModel = require("../models/settings");
            const settings = await settingsModel.findOne({ domain }).populate("sellerID");

            if (settings) {
                seller = settings.sellerID;
            }
        }

        if (!seller) {
            return res.status(404).json({
                storeAllowed: false,
                message: "Store not found",
            });
        }

        seller = await refreshSellerSubscriptionStatus(seller);

        const now = new Date();

        const isActive =
            seller.status === "approved" &&
            seller.subscriptionEndsAt &&
            new Date(seller.subscriptionEndsAt) > now &&
            ["trial", "active"].includes(seller.subscriptionStatus);

        if (!isActive) {
            return res.status(200).json({
                storeAllowed: false,
                message: "Store is under maintenance. Will get back soon.",
            });
        }

        res.status(200).json({
            storeAllowed: true,
            seller: {
                plan: seller.plan,
                subscriptionStatus: seller.subscriptionStatus,
                subscriptionEndsAt: seller.subscriptionEndsAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            storeAllowed: false,
            message: error.message,
        });
    }
});

module.exports = router;
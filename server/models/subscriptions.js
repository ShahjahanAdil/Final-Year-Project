const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    sellerID: {
        type: Schema.Types.ObjectId,
        ref: "sellers",
        required: true,
    },

    plan: {
        type: String,
        enum: ["Basic", "Advanced"],
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    durationDays: {
        type: Number,
        default: 30,
    },

    selectedBank: {
        bankName: { type: String },
        accountTitle: { type: String },
        accountName: { type: String },
        accountNumber: { type: String },
        iban: { type: String, default: null },
    },

    transactionID: {
        type: String,
        required: true,
    },

    transactionScreenshot: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "expired"],
        default: "pending",
    },

    adminNotes: {
        type: String,
        default: null,
    },

    startedAt: {
        type: Date,
        default: null,
    },

    expiresAt: {
        type: Date,
        default: null,
    },

    reviewedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const subscriptionsModel = mongoose.models.subscriptions || mongoose.model("subscriptions", subscriptionSchema);
module.exports = subscriptionsModel;
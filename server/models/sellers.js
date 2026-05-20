const mongoose = require('mongoose');
const { Schema } = mongoose;

const sellersSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'seller' },
    address: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    whatsappNumber: { type: String, default: null },
    cnic: { type: String, required: true },
    cnicFront: { type: String, default: null },
    cnicBack: { type: String, default: null },

    // Brand Details
    brandName: { type: String, required: true, unique: true },
    brandSlug: { type: String, required: true, unique: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'banned'], default: 'pending' },

    // Analytic Details
    analytics: {
        storeViews: { type: Number, default: 0 },
    },

    // Subscription Details
    plan: { type: String, default: null },
    subscriptionStatus: {
        type: String,
        enum: ['none', 'trial', 'active', 'expired'],
        default: 'none'
    },
    trialStartedAt: { type: Date, default: null },
    trialEndsAt: { type: Date, default: null },
    subscriptionStartedAt: { type: Date, default: null },
    subscriptionEndsAt: { type: Date, default: null },
}, { timestamps: true });

const sellersModel = mongoose.models.sellers || mongoose.model('sellers', sellersSchema);
module.exports = sellersModel;
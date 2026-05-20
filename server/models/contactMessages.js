const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactMessageSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    phone: {
        type: String,
        default: null,
        trim: true,
    },

    subject: {
        type: String,
        default: null,
        trim: true,
    },

    message: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ["new", "reviewed"],
        default: "new",
    },

    adminNotes: {
        type: String,
        default: null,
    },

    reviewedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const contactMessagesModel = mongoose.models.contactMessages || mongoose.model("contactMessages", contactMessageSchema);
module.exports = contactMessagesModel;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderID: { type: String, required: true, unique: true },
    userID: { type: Schema.Types.ObjectId, ref: "auth", required: true },
    sellerID: { type: Schema.Types.ObjectId, ref: "sellers", required: true },

    coupon: { type: String, default: null },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    deliveryCharges: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },

    shippingDetails: { type: Object, required: true },

    products: [{
        productID: { type: String, required: true },
        variantID: { type: String, default: null },
        brandSlug: { type: String, required: true },
        title: { type: String, required: true },
        slug: { type: String },
        mainImageURL: { type: String, required: true },
        variantImageURL: { type: String, default: null },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        comparedPrice: { type: Number, default: null },
        selectedOptions: [{
            optionName: { type: String },
            optionValue: { type: String }
        }],
        reviewed: { type: Boolean, default: false },
    }],

    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'returned', 'cancelled'],
        default: 'pending'
    },

    paymentMethod: { type: String, enum: ['cod', 'online'], default: 'cod' },
    paymentStatus: {
        type: String,
        enum: ['pending', 'processing', 'paid', 'refunded', 'failed'],
        default: 'pending',
    },

    statusHistory: [{
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'returned', 'cancelled']
        },
        timestamp: { type: Date, default: Date.now },
        _id: false
    }]
}, { timestamps: true });

const orderModel = mongoose.models.orders || mongoose.model('orders', orderSchema);
module.exports = orderModel;
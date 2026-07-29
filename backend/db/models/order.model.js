import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
        price: { type: Number }
    }],
    shippingAddress: { type: String, required: true },
    totalOrderPrice: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'card'], default: 'cash' },
    isDelivered: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false }
}, { timestamps: true });

export const orderModel = mongoose.model('Order', orderSchema);
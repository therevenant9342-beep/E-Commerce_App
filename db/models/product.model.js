import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true }
}, { timestamps: true });

export const productModel = mongoose.model('Product', productSchema);
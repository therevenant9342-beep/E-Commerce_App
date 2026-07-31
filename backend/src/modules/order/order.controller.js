import { orderModel } from "../../../db/models/order.model.js";
import { cartModel } from "../../../db/models/cart.model.js";
import { productModel } from "../../../db/models/product.model.js";

const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;
        const userId = req.user.id;

        const cart = await cartModel.findOne({ user: userId }).populate('cartItems.product');
        
        if (!cart || cart.cartItems.length === 0) {
            return res.status(404).json({ message: "Cart is empty or not found" });
        }

        for (const item of cart.cartItems) {
            if (item.quantity > item.product.stock) {
                return res.status(400).json({ 
                    message: `Not enough stock for "${item.product.title}". Only ${item.product.stock} available.` 
                });
            }
        }

        let totalOrderPrice = 0;
        const orderItems = cart.cartItems.map(item => {
            totalOrderPrice += (item.product.price * item.quantity);
            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            };
        });

        const order = await orderModel.create({
            user: userId,
            cartItems: orderItems,
            shippingAddress,
            paymentMethod,
            totalOrderPrice
        });

        for (const item of cart.cartItems) {
            await productModel.findByIdAndUpdate(
                item.product._id,
                { $inc: { stock: -item.quantity } } 
            );
        }

        await cartModel.findByIdAndDelete(cart._id);

        res.status(201).json({ message: "Order created successfully", order });

    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user.id }).populate('cartItems.product');
        res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

export { createOrder, getUserOrders };
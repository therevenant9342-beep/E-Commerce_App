import { cartModel } from "../../../db/models/cart.model.js";

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; 

        let cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            cart = await cartModel.create({
                user: userId,
                cartItems: [{ product: productId, quantity: quantity || 1 }]
            });
            
            await cart.populate('cartItems.product');
            
            return res.status(201).json({ message: "Cart created and product added", cart });
        }

        const productIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        if (productIndex > -1) {
            cart.cartItems[productIndex].quantity += (quantity || 1);
        } else {
            cart.cartItems.push({ product: productId, quantity: quantity || 1 });
        }

        await cart.save();
        await cart.populate('cartItems.product');
        
        res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user.id }).populate('cartItems.product');
        
        if (!cart) {
            return res.status(200).json({ message: "Cart empty", cart: { cartItems: [] } });
        }
        
        res.status(200).json({ message: "Cart retrieved successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const cart = await cartModel.findOneAndUpdate(
            { user: userId },
            { $pull: { cartItems: { product: productId } } },
            { new: true }
        ).populate('cartItems.product');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart", error: error.message });
    }
};

const updateCartQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        if (productIndex > -1) {
            cart.cartItems[productIndex].quantity = quantity;
            await cart.save();
            await cart.populate('cartItems.product');
            
            res.status(200).json({ message: "Cart quantity updated", cart });
        } else {
            res.status(404).json({ message: "Product not found in cart" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error: error.message });
    }
};

export { addToCart, getCart, removeFromCart, updateCartQuantity };
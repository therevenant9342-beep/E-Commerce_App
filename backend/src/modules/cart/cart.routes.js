import express from "express";
import { addToCart, getCart, removeFromCart, updateCartQuantity } from "./cart.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

export const cartRoutes = express.Router();

cartRoutes.post('/', verifyToken, addToCart);
cartRoutes.get('/', verifyToken, getCart);
cartRoutes.delete('/:productId', verifyToken, removeFromCart);
cartRoutes.put('/', verifyToken, updateCartQuantity);
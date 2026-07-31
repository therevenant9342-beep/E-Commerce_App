import express from "express";
import { addToCart, getCart, removeFromCart } from "./cart.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

export const cartRoutes = express.Router();

cartRoutes.post('/', verifyToken, addToCart);
cartRoutes.get('/', verifyToken, getCart);
cartRoutes.delete('/:productId', verifyToken, removeFromCart);
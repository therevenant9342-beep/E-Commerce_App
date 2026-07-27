import express from "express";
import { createOrder, getUserOrders } from "./order.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

export const orderRoutes = express.Router();

orderRoutes.post('/', verifyToken, createOrder);
orderRoutes.get('/', verifyToken, getUserOrders);
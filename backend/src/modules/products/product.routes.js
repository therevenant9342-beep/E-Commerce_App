import express from "express";
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "./product.controller.js";

export const productRoutes = express.Router();

productRoutes.post('/', addProduct);
productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getProductById);
productRoutes.put('/:id', updateProduct);
productRoutes.delete('/:id', deleteProduct);
import { productModel } from "../../../db/models/product.model.js";

const addProduct = async (req, res) => {
    try {
        const newProduct = await productModel.create(req.body);
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(400).json({ message: "Error adding product", error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ message: "All products fetched", products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product found", product });
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

export { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
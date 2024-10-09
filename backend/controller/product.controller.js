import Product from "../models/products.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid product id"});
    }

    try { 
        const product = await Product.find({_id: id});
        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error :", error.message)
        res.status(500).json({success: false, message: "Server error"})
    }

}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error :", error.message)
        res.status(500).json({success: false, message: "Server error"})
    }

}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please make sure you provide all fields"
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        console.error("ERROR: ", error.message);
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const updateProduct = async (req, res) => {
    const { id } =  req.params
    const product = req.body;

    console.log(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid product ID"
        });
    } 
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
        res.status(201).json({success: true, data: updatedProduct})
    } catch (error) {
        console.error("ERROR: ", error.message);
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Product not found"})
    }

    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "product successfully deleted"});
    } catch (error) {
        console.error("Error :", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }

}
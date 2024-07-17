import productsService from "../services/products-service.js";
import ProductModel from "../models/products-model.js";

const getProductsController = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await productsService.getProducts(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(401).json({ message: "Product not available" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addProductController = async (req,res) =>{
    try {
        const product = new ProductModel(req.body);
        const savedProduct = await productsService.addProducts(product);
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllProductsController = async (req,res) => {
    try {
        const products = await productsService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateProductController = async (req, res) => {
    const { productId } = req.params; 
    const updatedFields = req.body; 
    try {
        const updatedProduct = await productsService.updateProduct(productId, updatedFields);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getProductsController,
    addProductController,
    getAllProductsController,
    updateProductController
}
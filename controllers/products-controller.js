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

const deleteProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await productsService.deleteProduct(productId);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(401).json({ message: "Problem with deleting user" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductsByCategoryController = async (req, res) => {
    try {
        const { category } = req.params; 
        const products = await productsService.getProductsByCategory(category);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductsBySupplierController = async (req, res) => {
    try {
        const { supplier } = req.params; 
        const products = await productsService.getProductsBySupplier(supplier);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const groupProductsByColorController = async (req, res) => {
    try {
        const groupedProducts = await productsService.groupProductsByColor();
        res.status(200).json(groupedProducts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    getProductsController,
    addProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
    getProductsByCategoryController,
    getProductsBySupplierController,
    groupProductsByColorController
}
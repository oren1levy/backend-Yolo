import path from 'path';
import fs from 'fs';
import ProductModel from '../models/products-model.js';

const getProducts = async (id) => {
    const product = await ProductModel.findById(id);
    return product;
};

const addProducts = async (newProduct) => {
    const product = new ProductModel(newProduct);
    return await product.save();
};

const getAllProducts = async () => {
    try {
        const products = await ProductModel.find();
        return products;
    } catch (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
};

const updateProduct = async (productId, updatedFields) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            updatedFields,
            { new: true }
        );
        return updatedProduct;
    } catch (error) {
        throw new Error(`Failed to update product: ${error.message}`);
    }
};

const deleteProduct = async (productId) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw new Error('Product not found');
        }

        if (deletedProduct.img) {
            const imagePath = path.resolve(deletedProduct.img);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        return deletedProduct;
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
};

const getProductsByCategory = async (category) => {
    try {
        const products = await ProductModel.find({ category });
        return products;
    } catch (error) {
        throw new Error(`Failed to get products by category: ${error.message}`);
    }
};

const getProductsBySupplier = async (supplierId) => {
    try {
        const products = await ProductModel.find({ supplierId });
        return products;
    } catch (error) {
        throw new Error(`Failed to get products by supplier: ${error.message}`);
    }
};

const groupProductsByColor = async () => {
    try {
        const groupedProducts = await ProductModel.aggregate([
            {
                $group: {
                    _id: '$color',
                    products: { $push: '$$ROOT' }
                }
            }
        ]);
        return groupedProducts;
    } catch (error) {
        throw new Error(`Failed to group products by color: ${error.message}`);
    }
};

export default {
    getProducts,
    addProducts,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsBySupplier,
    groupProductsByColor
};

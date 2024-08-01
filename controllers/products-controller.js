import path from 'path';
import fs from 'fs';
import multer from 'multer';
import productsService from '../services/products-service.js';
import {postTweet} from '../services/twitter-service.js';

const getProductsController = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await productsService.getProducts(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(401).json({ message: "Product not available :(" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUploadPath = (category) => {
    const categoryMapping = {
        'עגיל': 'earrings',
        'שרשרת': 'necklaces',
    };

    const directoryName = categoryMapping[category] || 'misc';
    const uploadPath = path.join(path.resolve(), 'uploads', directoryName);

    return uploadPath;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = getUploadPath(req.body.productCategory);

        if (!uploadPath) {
            cb(new Error('Invalid upload path'));
            return;
        }

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const addProductController = async (req, res) => {
    try {
        const { productName, supplierId, productPrice, productDescription, productCategory, productColor } = req.body;
        const imgPath = req.file ? path.join('uploads', req.file.destination.split('uploads').pop(), req.file.filename) : null;

        const newProduct = {
            name: productName,
            supplierId,
            price: productPrice,
            description: productDescription,
            category: productCategory,
            color: productColor,
            img: imgPath
        };

        const savedProduct = await productsService.addProducts(newProduct);

        const status = `New product added: ${savedProduct.name} - ${savedProduct.description}`;

        await postTweet(status);

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error adding product and posting tweet:', error);
        res.status(400).json({ message: error.message });
    }
};

const getAllProductsController = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

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
            res.status(401).json({ message: "Problem with deleting product" });
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
    groupProductsByColorController,
    upload
};

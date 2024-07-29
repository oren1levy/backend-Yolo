import express from 'express';
import productsController from '../controllers/products-controller.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

router.route('/getProducts')
    .post(productsController.getProductsController);
router.route('/addProducts')
    .post(upload.single('productImage'), productsController.addProductController);
router.route('/getAllProducts')
    .post(productsController.getAllProductsController);
router.route('/updateProduct/:productId')
    .put(productsController.updateProductController);
router.route('/deleteProduct/:productId')
    .delete(productsController.deleteProductController);
router.route('/category/:category')
    .get(productsController.getProductsByCategoryController);
router.route('/supplier/:supplier')
    .get(productsController.getProductsBySupplierController);
router.route('/groupByColor')
    .get(productsController.groupProductsByColorController);

    

export default router;
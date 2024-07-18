import express from 'express';
import productsController from '../controllers/products-controller.js';

const router = express.Router();

router.route('/getProducts')
    .post(productsController.getProductsController);
router.route('/addProducts')
    .post(productsController.addProductController);
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
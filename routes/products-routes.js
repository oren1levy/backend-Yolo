import express from 'express';
import productsController from '../controllers/products-controller.js';

const router = express.Router();

router.route('/auth/getProducts')
    .post(productsController.getProductsController)
router.route('/auth/addProducts')
    .post(productsController.addProductController)
router.route('/auth/getAllProducts')
    .post(productsController.getAllProductsController)
router.route('/auth/updateProduct/:productId') 
    .put(productsController.updateProductController);

export default router;
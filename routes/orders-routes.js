import express from 'express';
import orderController from '../controllers/orders-controller.js';

const router = express.Router();

router.route('/')
    .post(orderController.createOrderController);
router.route('/:orderId')
    .get(orderController.getOrderByIdController)
    .put(orderController.updateOrderController)
    .delete(orderController.deleteOrderController);

export default router;

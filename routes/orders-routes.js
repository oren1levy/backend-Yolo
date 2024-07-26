import express from 'express';
import orderController from '../controllers/orders-controller.js';

const router = express.Router();

router.route('/')
    .post(orderController.createOrderController);
router.route('/:orderId')
    .get(orderController.getOrderByIdController)
    .put(orderController.updateOrderController)
    .delete(orderController.deleteOrderController);
router.route('/getAllOrders')
    .post(orderController.getAllOrdersController);
router.route('/sales/monthly')
    .get(orderController.getMonthlySalesController);
router.route('/user/:userId')
    .get(orderController.getOrdersByUserIdController);

export default router;

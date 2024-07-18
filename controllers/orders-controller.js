import orderService from "../services/orders-service.js";

const createOrderController = async (req, res) => {
    try {
        const order = req.body;
        const newOrder = await orderService.createOrder(order);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrderByIdController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderService.getOrderById(orderId);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateOrderController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedFields = req.body;
        const updatedOrder = await orderService.updateOrder(orderId, updatedFields);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteOrderController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await orderService.deleteOrder(orderId);
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createOrderController,
    getOrderByIdController,
    updateOrderController,
    deleteOrderController
};

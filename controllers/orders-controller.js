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

const getAllOrdersController = async (req,res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getMonthlySalesController = async (req, res) => {
    try {
        const salesData = await orderService.getMonthlySales();
        res.json(salesData);
    } catch (error) {
        console.error('Error in getMonthlySalesController:', error.message); 
        res.status(500).json({ message: error.message });
    }
};

const getOrdersByUserIdController = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await orderService.getOrdersByUserId(userId);
        if (orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: "No orders found for this user" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createOrderController,
    getOrderByIdController,
    updateOrderController,
    deleteOrderController,
    getAllOrdersController,
    getMonthlySalesController,
    getOrdersByUserIdController
};

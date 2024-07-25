import OrderModel from "../models/orders-model.js";

const createOrder = async (order) => {
    const newOrder = new OrderModel(order);
    const error = newOrder.validateSync();
    if (error) {
        throw error;
    }
    return newOrder.save();
};

const getOrderById = async (orderId) => {
    try {
        const order = await OrderModel.findById(orderId);
        return order;
    } catch (error) {
        throw new Error(`Failed to get order: ${error.message}`);
    }
};

const updateOrder = async (orderId, updatedFields) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            updatedFields,
            { new: true }
        );
        return updatedOrder;
    } catch (error) {
        throw new Error(`Failed to update order: ${error.message}`);
    }
};

const deleteOrder = async (orderId) => {
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            throw new Error('Order not found');
        }
        return deletedOrder;
    } catch (error) {
        throw new Error('Error deleting order: ' + error.message);
    }
};

const getAllOrders = async () =>{
    try {
        const Orders = await OrderModel.find();
        return Orders;
    } catch (error) {
        throw new Error(`Failed to fetch Orders: ${error.message}`);
    }
}

const getMonthlySales = async () => {
    try {
        const salesData = await OrderModel.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalSales: { $sum: "$totalPrice" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        console.log('Sales data:', salesData); 
        return salesData;
    } catch (error) {
        console.error(`Failed to fetch monthly sales data: ${error.message}`); 
        throw new Error(`Failed to fetch monthly sales data: ${error.message}`);
    }
};

export default {
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getMonthlySales
};

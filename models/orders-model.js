import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
address: {
    type: String,
    required: true
},
city: {
    type: String,
    required: true
},
phone: {
    type: String,
    required: true
},
postalCode: {
    type: String,
    required: true
},
productsId: {
    type: [String],
    required: true
},
totalPrice: {
    type: Number,
    required: true
},
userId: {
    type: String,
    required: true
},
billNumber: {
    type: String,
    required: true
}
}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema, "orders");

export default OrderModel;


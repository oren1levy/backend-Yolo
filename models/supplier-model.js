import mongoose from "mongoose";
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    balance: {
        type: String,
        required: true  
    }
}, { timestamps: true });

const supplierModel = mongoose.model('Supplier', supplierSchema, "suppliers");

export default supplierModel;
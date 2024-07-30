import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    supplierId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProductModel = mongoose.model('Products', productSchema, "products");

export default ProductModel; 
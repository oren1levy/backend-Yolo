import mongoose from "mongoose";
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { timestamps: true });

const LocationModel = mongoose.model('Location', locationSchema, "location");

export default LocationModel;

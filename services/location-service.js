import LocationModel from "../models/location-model.js";

const getAllLocations = async () => {
    try {
        const locations = await LocationModel.find();
        return locations;
    } catch (error) {
        throw new Error(`Error fetching locations: ${error.message}`);
    }
};

export default {
    getAllLocations
};

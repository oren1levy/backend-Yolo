import locationService from "../services/location-service.js";

const getAllLocationsController = async (req, res) => {
    try {
        const locations = await locationService.getAllLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    getAllLocationsController
};

import metalService from "../services/metal-service.js";

const getPricesController = async (req, res) => {
    const prices = await metalService.getPrices();
    res.status(200).json(prices)
}

export default {
    getPricesController
}
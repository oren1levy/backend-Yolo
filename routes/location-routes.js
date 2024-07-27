import express from 'express';
import locationController from '../controllers/location-controller.js';

const router = express.Router();

router.route('/getAllLocations')
    .get(locationController.getAllLocationsController);

export default router;

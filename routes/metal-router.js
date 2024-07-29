import { Router } from 'express'
import metalController from '../controllers/metal-controller.js';

const router = Router();

router.route('/prices').get(metalController.getPricesController)

export default router;
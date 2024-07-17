import express from 'express';
import supplierController from '../controllers/supplier-controller.js';

const router = express.Router();

router.route('/auth/getSupplier')
    .post(supplierController.getSupplierController)
router.route('/auth/getAllSupplier')
    .post(supplierController.getAllSuppliersController)
router.route('/auth/addSupplier')
    .post(supplierController.addSupplierController)
router.route('/auth/deleteSupplier/:id')
    .delete(supplierController.deleteSupplierController)


export default router;
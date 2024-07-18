import express from 'express';
import supplierController from '../controllers/supplier-controller.js';

const router = express.Router();

router.route('/getSupplier')
    .post(supplierController.getSupplierController);
router.route('/getAllSuppliers')
    .post(supplierController.getAllSuppliersController);
router.route('/addSupplier')
    .post(supplierController.addSupplierController);
router.route('/deleteSupplier/:id')
    .delete(supplierController.deleteSupplierController);


export default router;
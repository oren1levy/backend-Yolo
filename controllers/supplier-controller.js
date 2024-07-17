import supplierModel from "../models/supplier-model.js";
import suppliersService from "../services/suppliers-service.js";

const getSupplierController = async (req, res) => {
    try {
        const { id } = req.body;
        const supplier = await suppliersService.getSupplierById(id);
        if (supplier) {
            res.status(200).json(supplier);
        } else {
            res.status(401).json({ message: "supplier not available" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllSuppliersController = async (req, res) => {
    try {
        const suppliers = await suppliersService.getAllSuppliers();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addSupplierController= async(req,res)=>{
    try {
        const newSupplier = new supplierModel(req.body);
        const savedSupplier = await suppliersService.addSupplier(newSupplier);
        res.status(201).json(savedSupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteSupplierController= async(req,res)=>{
    const {id}= req.params;
    try{
        const deleteSupplier= await suppliersService.deleteSupplierById(id);
         if (deleteSupplier) {
             res.status(200).json(deleteSupplier);
        } else {
        res.status(401).json({ message: "problem with delete supplier" });
       }
       }
     catch (error) {
        res.status(400).json({ message: error.message });
       }
}

export default {
    getSupplierController,
    getAllSuppliersController,
    addSupplierController,
    deleteSupplierController
}


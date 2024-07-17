import supplierModel from "../models/supplier-model.js";

const getSupplierById = async (id) => {
    try {
        const supplier = await supplierModel.findById(id);
        return supplier;
    } catch (error) {
        throw new Error('Error retrieving supplier by id: ' + error.message);
    }
};

const getAllSuppliers = async () => {
    try {
        const suppliers = await supplierModel.find();    
        return suppliers;
    } catch (error) {
        throw new Error('Error retrieving all suppliers: ' + error.message);
    }
};

const addSupplier= async(supplier) =>{
    const newSupplier = new supplierModel(supplier);
    const error = newSupplier.validateSync();
    if (error) {
        throw error;
    }
    return newSupplier.save();
}

const deleteSupplierById= async(id)=>{
    try {
        const deletedSupplier = await supplierModel.findByIdAndDelete(id);
        if (!deletedSupplier) {
            throw new Error('Supplier not found');
        }
        return deletedSupplier;
    } catch (error) {
        throw new Error('Error deleting supplier: ' + error.message);
    }
}


export default { 
    getSupplierById,
    getAllSuppliers,
    addSupplier,
    deleteSupplierById
};

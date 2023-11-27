const mongoose = require("mongoose");

const {
    Supplier
} = require("./model");

const getAllSuppliers = async() => {
    return await Supplier.find({});
};

const getOneSupplier = async(id) => {
    return await Supplier.findOne({_id: id});
};

const createSupplier = async(s) => {
    const supplier = new Supplier(s);
    return await supplier.save();
};

const updateSupplier = async(id, newData) => {
    return await Supplier.updateOne({_id: id}, newData);
};

const removeSupplier = async(id) => {
    return await Supplier.deleteOne({_id: id});
};

module.exports = {
    getAllSuppliers,
    getOneSupplier,
    createSupplier,
    updateSupplier,
    removeSupplier
}
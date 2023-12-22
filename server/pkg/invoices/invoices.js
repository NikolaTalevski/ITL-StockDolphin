const mongoose = require("mongoose");

const {
    Invoice
} = require("./model");

const getAllInvoices = async() => {
    return await Invoice.find({});
};

const getOneInvoice = async(id) => {
    return await Invoice.findOne({_id: id});
};

const createInvoice = async(i) => {
    const invoice = new Invoice(i);
    return await invoice.save();
};

const updateInvoice = async(id, newData) => {
    return await Invoice.updateOne({_id: id}, newData);
};

const removeInvoice = async(id) => {
    return await Invoice.deleteOne({_id: id});
};

module.exports = {
    getAllInvoices,
    getOneInvoice,
    createInvoice,
    updateInvoice,
    removeInvoice
};
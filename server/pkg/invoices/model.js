const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    name: String,
    supplier: String,
    date: Date,
    orders: String
});

const Invoice = mongoose.model("invoices", invoiceSchema, "invoices");

module.exports = {
    Invoice
};
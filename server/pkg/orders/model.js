const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    item: String,
    supplier: String,
    quantity: String,
    price: String,
    date: Date,
}, {
    timestamps: true
});

const Order = mongoose.model("orders", orderSchema, "orders");

module.exports = {
    Order 
}
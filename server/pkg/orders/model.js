const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    supplier: String,
    quantity: Number,
    price: Number,
    date: Date,
})

const Order = mongoose.model("Orders", orderSchema);

module.exports = {
    Order 
}
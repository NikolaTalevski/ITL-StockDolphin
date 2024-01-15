const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: String,
  address: String,
  phonenumber: Number,
  email: String,
});

const Supplier = mongoose.model("Suppliers", supplierSchema);

module.exports = {
  Supplier,
};

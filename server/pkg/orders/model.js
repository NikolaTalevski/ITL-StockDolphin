const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    supplier: String,
    quantity: String,
    price: String,
    date: Date,
    itemID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "items",
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("orders", orderSchema, "orders");

module.exports = {
  Order,
};

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    item: String,
    supplier: String,
    quantity: String,
    price: String,
    date: Date,
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

const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    name: String,
    supplier: String,
    date: Date,
    orders: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "orders",
      },
    ],
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("invoices", invoiceSchema, "invoices");

module.exports = {
  Invoice,
};

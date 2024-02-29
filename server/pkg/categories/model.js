const mongoose = require("mongoose");
const { Item } = require("../items/model");

const categorySchema = new mongoose.Schema(
  {
    name: String,
    image: Buffer,
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("categories", categorySchema, "categories");

module.exports = {
  Category,
};

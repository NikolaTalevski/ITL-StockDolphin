const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  image: Buffer,
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "categories",
  },
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
});

const Item = mongoose.model("items", itemSchema, "items");

module.exports = {
  Item,
};

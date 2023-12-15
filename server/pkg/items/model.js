const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    category_id: String,
    name: String,
    image: Buffer,
});

const Item = mongoose.model("items", itemSchema, "items");

module.exports = {
    Item
}
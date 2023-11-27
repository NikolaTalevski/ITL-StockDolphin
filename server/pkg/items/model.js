const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    image: Buffer,
})

const Item = mongoose.model("Items", itemSchema);

module.exports = {
    Item
}
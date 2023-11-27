const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    image: Buffer,
})

const Category = mongoose.model("Categories", categorySchema);

module.exports = {
    Category
}
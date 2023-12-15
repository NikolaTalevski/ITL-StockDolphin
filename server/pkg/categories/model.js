const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    image: Buffer,
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    }
});

const Category = mongoose.model("categories", categorySchema, "categories");

module.exports = {
    Category
}
const mongoose = require("mongoose");

const {
    Category
} = require("./model");

const getAllCategories = async(user_id) => {
    return await Category.find({ user_id });
};

const getOneCategory = async(user_id, id) => {
    return await Category.findOne({ user_id: user_id ,_id: id});
};

const createCategory = async(c) => {
    const category = new Category(c);
    return await category.save();
};

const updateCategory = async(id, newData) => {
    return await Category.updateOne({_id: id}, newData);
};

const removeCategory = async(id) => {
    return await Category.deleteOne({_id: id});
};

module.exports = {
    getAllCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    removeCategory
} 
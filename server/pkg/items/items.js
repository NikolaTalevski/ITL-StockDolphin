const mongoose = require("mongoose");

const {
    Item
} = require("./model");

const getAllItems = async() => {
    return await Item.find({});
};

const getOneItem = async(id) => {
    return await Item.findOne({_id: id});
};

const createItem = async(i) => {
    const item = new Item(i);
    return await item.save();
};

const updateItem = async(id, newData) => {
    return await Item.updateOne({_id: id}, newData);
};

const removeItem = async(id) => {
    return await Item.deleteOne({_id: id});
};

module.exports = {
    getAllItems,
    getOneItem,
    createItem,
    updateItem,
    removeItem
}
const mongoose = require("mongoose");

const {
    Order
} = require("./model");

const getAllOrders = async() => {
    return await Order.find({});
};

const getOneOrder = async(id) => {
    return await Order.findOne({_id: id});
};

const createOrder = async(o) => {
    const order = new Order(o);
    return await order.save();
};

const updateOrder = async(id, newData) => {
    return await Order.updateOne({_id: id}, newData);
};

const removeOrder = async(id) => {
    return await Order.deleteOne({_id: id});
};

module.exports = {
    getAllOrders,
    getOneOrder,
    createOrder,
    updateOrder,
    removeOrder
}
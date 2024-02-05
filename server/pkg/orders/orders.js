const mongoose = require("mongoose");

const { Order } = require("./model");

const getAllOrders = async (user_id) => {
  return await Order.find({ user_id });
};

const getOneOrder = async (user_id, id) => {
  return await Order.findOne({ user_id: user_id, _id: id });
};

const getPrice = async (user_id, price) => {
  return await Order.find({ user_id: user_id, price: price });
};

const createOrder = async (o) => {
  const order = new Order(o);
  return await order.save();
};

const updateOrder = async (id, newData) => {
  return await Order.updateOne({ _id: id }, newData);
};

const removeOrder = async (id) => {
  return await Order.deleteOne({ _id: id });
};

module.exports = {
  getAllOrders,
  getOneOrder,
  getPrice,
  createOrder,
  updateOrder,
  removeOrder,
};

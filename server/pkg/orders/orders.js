const mongoose = require("mongoose");

const { Order } = require("./model");

const getAllOrders = async (user_id) => {
  return await Order.find({ user_id });
};

const getOneOrder = async (user_id, id) => {
  return await Order.findOne({ user_id: user_id, _id: id });
};

const getTotalOrderPrice = async (user_id) => {
  try {
    const orders = await Order.find({ user_id: user_id });
    const totalPrice = orders.reduce(
      (total, order) => total + parseFloat(order.price),
      0
    );
    return totalPrice;
  } catch (err) {
    console.log(err);
    throw err;
  }
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
  getTotalOrderPrice,
  createOrder,
  updateOrder,
  removeOrder,
};

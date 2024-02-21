const mongoose = require("mongoose");

const { Order } = require("./model");
const { createActivity } = require("../recent-activity/recent-activity");
const {
  Activity,
  ActivityAction,
  ActivityEntityType,
} = require("../recent-activity/model");
const { getOneUser } = require("../users/users");
const { getOneItem } = require("../items/items");

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
  const newOrder = await order.save();
  const user = await getOneUser(o.user_id);
  const item = await getOneItem(o.user_id, o.itemID);

  createActivity(
    new Activity({
      action: ActivityAction.Ordered,
      entityName: item.name,
      entityType: ActivityEntityType.Item,
      username: user.username,
    })
  );
  return newOrder;
};

const updateOrder = async (id, newData, user_id) => {
  const updateOrder = await Order.findByIdAndUpdate({ _id: id }, newData);
  const user = await getOneUser(user_id);
  const item = await getOneItem(user_id, updateOrder.itemID);

  createActivity(
    new Activity({
      action: ActivityAction.Edited,
      entityName: item.name,
      entityType: ActivityEntityType.Order,
      username: user.username,
    })
  );
  return updateOrder;
};

const removeOrder = async (id, user_id) => {
  const removedOrder = await Order.findByIdAndDelete({ _id: id });
  const user = await getOneUser(user_id);
  const item = await getOneItem(user_id, removedOrder.itemID);

  createActivity(
    new Activity({
      action: ActivityAction.Deleted,
      entityName: item.name,
      entityType: ActivityEntityType.Order,
      username: user.username,
    })
  );
  return removedOrder;
};

module.exports = {
  getAllOrders,
  getOneOrder,
  getTotalOrderPrice,
  createOrder,
  updateOrder,
  removeOrder,
};

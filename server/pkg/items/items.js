const mongoose = require("mongoose");

const { Item } = require("./model");
const { createActivity } = require("../recent-activity/recent-activity");
const {
  Activity,
  ActivityAction,
  ActivityEntityType,
} = require("../recent-activity/model");
const { getOneUser } = require("../users/users");
const { getOneCategory } = require("../categories/categories");
const { Order } = require("../orders/model");

const getAllItemsByCategoryId = async (categoryId) => {
  return await Item.find({ categoryId: categoryId });
};

const getAllItems = async (user_id) => {
  return await Item.find({ user_id });
};

const getOneItem = async (user_id, id) => {
  return await Item.findOne({ user_id: user_id, _id: id });
};

const createItem = async (i) => {
  const item = new Item(i);
  const newItem = await item.save();
  const user = await getOneUser(i.user_id);
  const category = await getOneCategory(i.user_id, i.categoryId);

  createActivity(
    new Activity({
      action: ActivityAction.Created,
      entityName: newItem.name,
      entityType: ActivityEntityType.Item,
      category: category.name,
      username: user.username,
    })
  );

  return { ...newItem.toJSON(), orders: [] };
};

const updateItem = async (id, newData, user_id) => {
  const updateItem = await Item.findByIdAndUpdate({ _id: id }, newData);
  const user = await getOneUser(user_id);

  createActivity(
    new Activity({
      action: ActivityAction.Edited,
      entityName: updateItem.name,
      entityType: ActivityEntityType.Item,
      username: user.username,
    })
  );
  return updateItem;
};

const removeItem = async (id, user_id) => {
  const removeItem = await Item.findByIdAndDelete({ _id: id });
  await Order.deleteMany({ itemID: id });
  const user = await getOneUser(user_id);

  createActivity(
    new Activity({
      action: ActivityAction.Deleted,
      entityName: removeItem.name,
      entityType: ActivityEntityType.Item,
      username: user.username,
    })
  );
  return removeItem;
};

module.exports = {
  getAllItems,
  getAllItemsByCategoryId,
  getOneItem,
  createItem,
  updateItem,
  removeItem,
};

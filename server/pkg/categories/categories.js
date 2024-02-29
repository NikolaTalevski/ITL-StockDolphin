const mongoose = require("mongoose");

const { Category } = require("./model");
const { createActivity } = require("../recent-activity/recent-activity");
const {
  Activity,
  ActivityAction,
  ActivityEntityType,
} = require("../recent-activity/model");
const { getOneUser } = require("../users/users");
const { Item } = require("../items/model");
const { Order } = require("../orders/model");

const getAllCategories = async (user_id) => {
  return await Category.find({ user_id });
};

const getOneCategory = async (user_id, id) => {
  return await Category.findOne({ user_id: user_id, _id: id });
};

const createCategory = async (c) => {
  const category = new Category(c);
  const newCategory = await category.save();
  const user = await getOneUser(c.user_id);

  createActivity(
    new Activity({
      action: ActivityAction.Created,
      entityName: newCategory.name,
      entityType: ActivityEntityType.Category,
      username: user.username,
    })
  );
  return newCategory.toJSON();
};

const updateCategory = async (id, newData, user_id) => {
  const updateCategory = await Category.findByIdAndUpdate({ _id: id }, newData);
  const user = await getOneUser(user_id);

  createActivity(
    new Activity({
      action: ActivityAction.Edited,
      entityName: updateCategory.name,
      entityType: ActivityEntityType.Category,
      username: user.username,
    })
  );
  return updateCategory;
};

const removeCategory = async (id, user_id) => {
  const removeCategory = await Category.findOneAndDelete({ _id: id });
  const itemsToBeDeleted = await Item.find({ categoryId: id });
  await Item.deleteMany({ categoryId: id });

  itemsToBeDeleted.forEach(
    async (i) => await Order.deleteMany({ itemID: i._id })
  );
  const user = await getOneUser(user_id);

  createActivity(
    new Activity({
      action: ActivityAction.Deleted,
      entityName: removeCategory.name,
      entityType: ActivityEntityType.Category,
      username: user.username,
    })
  );
  return removeCategory;
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  removeCategory,
};

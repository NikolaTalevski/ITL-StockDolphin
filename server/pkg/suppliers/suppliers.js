const mongoose = require("mongoose");

const { Supplier } = require("./model");
const { createActivity } = require("../recent-activity/recent-activity");
const {
  Activity,
  ActivityAction,
  ActivityEntityType,
} = require("../recent-activity/model");
const { getOneUser } = require("../users/users");

const getAllSuppliers = async () => {
  return await Supplier.find({});
};

const getOneSupplier = async (id) => {
  return await Supplier.findOne({ _id: id });
};

const createSupplier = async (s) => {
  const supplier = new Supplier(s);
  const newSupplier = await supplier.save();
  const user = await getOneUser(s.user_id);

  createActivity(
    new Activity({
      action: ActivityAction.Created,
      entityName: newSupplier.name,
      entityType: ActivityEntityType.Supplier,
      username: user.username,
    })
  );
  return newSupplier;
};

const updateSupplier = async (id, newData, user_id) => {
  const updateSupplier = await Supplier.findByIdAndUpdate({ _id: id }, newData);
  const user = await getOneUser(user_id);

  createActivity(
    new Activity({
      action: ActivityAction.Edited,
      entityName: updateSupplier.name,
      entityType: ActivityEntityType.Supplier,
      username: user.username,
    })
  );
  return updateSupplier;
};

const removeSupplier = async (id, user_id) => {
  const removeSupplier = await Supplier.findByIdAndDelete({ _id: id });
  const user = await getOneUser(user_id);

  createActivity(
    new Activity({
      action: ActivityAction.Deleted,
      entityName: removeSupplier.name,
      entityType: ActivityEntityType.Supplier,
      username: user.username,
    })
  );
  return removeSupplier;
};

module.exports = {
  getAllSuppliers,
  getOneSupplier,
  createSupplier,
  updateSupplier,
  removeSupplier,
};

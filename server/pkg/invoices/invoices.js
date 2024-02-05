const mongoose = require("mongoose");

const { Invoice } = require("./model");

const getAllInvoices = async (user_id) => {
  return await Invoice.find({ user_id });
};

const getOneInvoice = async (user_id, id) => {
  return await Invoice.findOne({ user_id: user_id, _id: id });
};

const createInvoice = async (i) => {
  const invoice = new Invoice(i);
  return await invoice.save();
};

const updateInvoice = async (id, newData) => {
  return await Invoice.updateOne({ _id: id }, newData);
};

const removeInvoice = async (id) => {
  return await Invoice.deleteOne({ _id: id });
};

module.exports = {
  getAllInvoices,
  getOneInvoice,
  createInvoice,
  updateInvoice,
  removeInvoice,
};

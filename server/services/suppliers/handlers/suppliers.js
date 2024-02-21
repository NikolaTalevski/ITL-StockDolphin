const suppliers = require("../../../pkg/suppliers/suppliers");
const {
  supplierPOST,
  supplierPUT,
} = require("../../../pkg/suppliers/suppliers-validate");

const { validate } = require("../../../pkg/utils/validate");

const getAllSuppliersHandler = async (req, res) => {
  try {
    const sup = await suppliers.getAllSuppliers(req.auth.id);
    return res.status(200).send(sup);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const getOneSupplierHandler = async (req, res) => {
  try {
    const sup = await suppliers.getOneSupplier(req.params.id);
    if (!sup) {
      throw {
        code: 404,
        error: "Supplier not found",
      };
    }
    return res.status(200).send(sup);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const createSupplierHandler = async (req, res) => {
  try {
    await validate(req.body, supplierPOST);
    if (!req.auth.id) {
      return res.status(400).send("Unauthorized Action");
    }
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    const sup = await suppliers.createSupplier(data);
    return res.status(200).send(sup);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Interval server error");
  }
};

const updateSupplierHandler = async (req, res) => {
  try {
    await validate(req.body, supplierPUT);
    if (!req.auth.id) {
      return res.status(400).send("Unauthorized Action");
    }
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    await suppliers.updateSupplier(req.params.id, data, req.auth.id);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Interval server error");
  }
};

const removeSupplierHandler = async (req, res) => {
  try {
    await suppliers.removeSupplier(req.params.id, req.auth.id);
    return res.status(200).send("Delete successful");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllSuppliersHandler,
  getOneSupplierHandler,
  createSupplierHandler,
  updateSupplierHandler,
  removeSupplierHandler,
};

const { Validator } = require("node-input-validator");

const supplierPOST = {
  name: "required|string",
  address: "required|string",
  phonenumber: "required|number",
  email: "required|string",
};

const supplierPUT = {
  name: "string",
  address: "string",
  phonenumber: "number",
  email: "string",
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors,
    };
  }
};

module.exports = {
  supplierPOST,
  supplierPUT,
  validate,
};

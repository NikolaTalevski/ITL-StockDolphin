const supplierPOST = {
  name: "required|string",
  address: "required|string",
  phonenumber: "required|string",
  email: "required|string",
};

const supplierPUT = {
  name: "string",
  address: "string",
  phonenumber: "string",
  email: "string",
};

module.exports = {
  supplierPOST,
  supplierPUT,
};

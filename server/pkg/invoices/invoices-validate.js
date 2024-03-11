const invoicePOST = {
  name: "required|string",
  supplier: "string",
  date: "date",
  orders: "required|array",
};

const invoicePUT = {
  name: "string",
  supplier: "string",
  date: "date",
  orders: "array",
};

module.exports = {
  invoicePOST,
  invoicePUT,
};

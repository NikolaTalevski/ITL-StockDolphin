const invoicePOST = {
  name: "required|string",
  supplier: "required|string",
  date: "date",
  orders: "required|string",
};

const invoicePUT = {
  name: "string",
  supplier: "string",
  date: "date",
  orders: "string",
};

module.exports = {
  invoicePOST,
  invoicePUT,
};

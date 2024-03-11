const orderPOST = {
  itemID: "required|string",
  // itemName: "required|string",
  supplier: "required|string",
  quantity: "required|string",
  price: "required|string",
  date: "date",
};

const orderPUT = {
  // itemName: "string",
  supplier: "string",
  quantity: "string",
  price: "string",
  date: "date",
};

module.exports = {
  orderPOST,
  orderPUT,
};

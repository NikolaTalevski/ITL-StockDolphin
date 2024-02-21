const itemPOST = {
  name: "required|string",
  categoryId: "required|string",
  image: "string",
};

const itemPUT = {
  name: "required|string",
  image: "string",
};

module.exports = {
  itemPOST,
  itemPUT,
};

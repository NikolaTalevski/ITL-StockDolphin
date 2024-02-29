const categories = require("../../../pkg/categories/categories");
const itemCat = require("../../../pkg/items/items");
const ordItm = require("../../../pkg/orders/orders");

const {
  categoryPOST,
  categoryPUT,
} = require("../../../pkg/categories/categories-validate");

const { validate } = require("../../../pkg/utils/validate");

const getAllCategoriesHandler = async (req, res) => {
  try {
    const ctg = await categories.getAllCategories(req.auth.id);
    const listOfCategoryIds = await Promise.all(
      ctg.map(async (category) => {
        const items = await itemCat.getAllItemsByCategoryId(
          category._id.toString()
        );
        const itemsWithOrders = await Promise.all(
          items.map(async (item) => {
            const orders = await ordItm.getAllOrdersByItemId(
              item._id.toString()
            );

            return { ...item.toJSON(), orders };
          })
        );
        return { ...category.toJSON(), items: itemsWithOrders };
      })
    );
    return res.status(200).send(listOfCategoryIds);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const getOneCategoryHandler = async (req, res) => {
  try {
    const ctg = await categories.getOneCategory(req.auth.id, req.params.id);
    if (!ctg) {
      throw {
        code: 404,
        error: "Category not found",
      };
    }
    return res.status(200).send(ctg);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const createCategoryHandler = async (req, res) => {
  try {
    await validate(req.body, categoryPOST);
    if (!req.auth.id) {
      return res.status(400).send("Unauthorized Action");
    }
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    const ctg = await categories.createCategory(data);
    return res.status(200).send({ ...ctg, items: [] });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const updateCategoryHandler = async (req, res) => {
  try {
    await validate(req.body, categoryPUT);
    if (!req.auth.id) {
      return res.status(400).send("Unauthorized Action");
    }
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    await categories.updateCategory(req.params.id, data, req.auth.id);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const removeCategoryHandler = async (req, res) => {
  try {
    await categories.removeCategory(req.params.id, req.auth.id);
    return res.status(200).send("Delete successful");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllCategoriesHandler,
  getOneCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  removeCategoryHandler,
};

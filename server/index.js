const config = require("./pkg/config");
require("./pkg/db");

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const auth = require("./services/auth/handlers/auth");
const category = require("./services/categories/handlers/categories");
const item = require("./services/items/handlers/items");
const order = require("./services/orders/handlers/orders");

const api = express();

api.use(express.json());
api.use(jwt({
    secret: config.getSection("development").jwt,
    algorithms: ["HS256"],
}).unless({
    path: [
        "/api/v1/auth/register",
        "/api/v1/auth/login"
    ]
}));

api.post("/api/v1/auth/register", auth.register); // raboti
api.post("/api/v1/auth/login", auth.login); // raboti

api.get("/api/v1/category", category.getAllCategoriesHandler); // raboti
api.get("/api/v1/category/:id", category.getOneCategoryHandler); //raboti
api.post("/api/v1/category", category.createCategoryHandler); // raboti
api.put("/api/v1/category/:id", category.updateCategoryHandler); // raboti
api.delete("/api/v1/category/:id", category.removeCategoryHandler); // raboti

api.get("/api/v1/item", item.getAllItemsHandler); // raboti
api.get("/api/v1/item/:id", item.getOneItemHandler); // raboti
api.post("/api/v1/item", item.createItemHandler); // raboti
api.put("/api/v1/item/:id", item.updateItemHandler); // raboti
api.delete("/api/v1/item/:id", item.removeItemHandler); // raboti

api.get("/api/v1/order", order.getAllOrdersHandler);
api.get("/api/v1/order/:id", order.getOneOrderHandler);
api.post("/api/v1/order", order.createOrderHandler);
api.put("/api/v1/order/:id", order.updateOrderHandler);
api.delete("/api/v1/order/:id", order.removeOrderHandler);


api.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedAccess"){
        res.status(401).send("Invalid token");
    }
});

api.listen(config.getSection("development").port, (err) => {
    if (err) return console.log(err);
    console.log(`Server started on port ${config.getSection("development").port}`);
}); 
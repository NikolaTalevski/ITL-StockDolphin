const config = require("../../pkg/config");
require("../../pkg/db");

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const category = require("./handlers/categories");

const api = express();

api.use(express.json());
api.use(jwt({
    secret: config.getSection("security").jwt,
    algorithms: ["HS256"]
}));

api.get("/api/v1/category", category.getAllCategoriesHandler);
api.get("/api/v1/category/:id", category.getOneCategoryHandler);
api.post("/api/v1/category", category.createCategoryHandler);
api.put("/api/v1/category/:id", category.updateCategoryHandler);
api.delete("/api/v1/category/:id", category.removeCategoryHandler);

api.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedAccess") {
        res.status(401).send("Invalid token");
    }
});

api.listen(config.getSection("services").categories.port, (err) => {
    if (err) return console.log(err);
    console.log(`Server started on port ${config.getSection("services").categories.port}`);
});
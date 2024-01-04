const config = require("../../pkg/config");
require("../../pkg/db");

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const item = require("./handlers/items");

const api = express();

api.use(express.json());
api.use(jwt({
    secret: config.getSection("security").jwt,
    algorithms: ["HS256"]
}));

api.get("/api/v1/item", item.getAllItemsHandler); // raboti
api.get("/api/v1/item/:id", item.getOneItemHandler); // raboti
api.post("/api/v1/item", item.createItemHandler); // raboti
api.put("/api/v1/item/:id", item.updateItemHandler); // raboti
api.delete("/api/v1/item/:id", item.removeItemHandler); // raboti

api.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedAccess") {
        res.status(401).send("Invalid token");
    }
});

api.listen(config.getSection("services").items.port, (err) => {
    if (err) return console.log(err);
    console.log(`Server started on port ${config.getSection("services").items.port}`);
});
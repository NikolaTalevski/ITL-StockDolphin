const config = require("../../pkg/config");
require("../../pkg/db");

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const order = require("./handlers/orders");

const api = express();

api.use(express.json());
api.use(
  jwt({
    secret: config.getSection("security").jwt,
    algorithms: ["HS256"],
  })
);

api.get("/api/v1/order", order.getAllOrdersHandler);
api.get("/api/v1/order/:id", order.getOneOrderHandler);
api.get("/api/v1/orderprice", order.getPriceHandler);
api.post("/api/v1/order", order.createOrderHandler);
api.put("/api/v1/order/:id", order.updateOrderHandler);
api.delete("/api/v1/order/:id", order.removeOrderHandler);

api.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token");
  }
});

api.listen(config.getSection("services").orders.port, (err) => {
  if (err) return console.log(err);
  console.log(
    `Server started on port ${config.getSection("services").orders.port}`
  );
});

const config = require("../../pkg/config");
require("../../pkg/db");

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const supplier = require("./handlers/suppliers");

const api = express();

api.use(express.json());
api.use(
  jwt({
    secret: config.getSection("security").jwt,
    algorithms: ["HS256"],
  })
);

api.get("/api/v1/supplier", supplier.getAllSuppliersHandler);
api.get("/api/v1/supplier", supplier.getOneSupplierHandler);
api.post("/api/v1/supplier", supplier.createSupplierHandler);
api.put("/api/v1/supplier", supplier.updateSupplierHandler);
api.delete("/api/v1/supplier", supplier.removeSupplierHandler);

api.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedAccess") {
    res.status(401).send("Invalid token");
  }
});

api.listen(config.getSection("services").suppliers.port, (err) => {
  if (err) return console.log(err);
  console.log(
    `Server started on port ${config.getSection("services").suppliers.port}`
  );
});

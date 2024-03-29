const config = require("../../pkg/config");
require("../../pkg/db");

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const invoice = require("./handlers/invoices");

const api = express();

api.use(express.json());
api.use(
  jwt({
    secret: config.getSection("security").jwt,
    algorithms: ["HS256"],
  })
);

api.get("/api/v1/invoice", invoice.getAllInvoicesHandler);
api.get("/api/v1/invoice/:id", invoice.getOneInvoiceHandler);
api.post("/api/v1/invoice", invoice.createInvoiceHandler);
api.put("/api/v1/invoice/:id", invoice.updateInvoiceHandler);
api.delete("/api/v1/invoice/:id", invoice.removeInvoiceHandler);

api.use(function (err, req, res, next) {
  console.log("Invoice test" + err);
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token");
  }
});

api.listen(config.getSection("services").invoices.port, (err) => {
  if (err) return console.log(err);
  console.log(
    `Server started on port ${config.getSection("services").invoices.port}`
  );
});

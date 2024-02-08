const path = require("path");
const proxy = require("express-http-proxy");
const express = require("express");
const config = require("../../pkg/config");

const app = express();

app.use(
  "/api/v1/auth",
  proxy(`http://127.0.0.1:${config.getSection("services").auth.port}`, {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:${config.getSection("services").auth.port}/api/v1/auth${
        req.url
      }`,
  })
);

app.use(
  "/api/v1/category",
  proxy(`http://127.0.0.1:${config.getSection("services").categories.port}`, {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:${
        config.getSection("services").categories.port
      }/api/v1/category${req.url}`,
  })
);

app.use(
  "/api/v1/item",
  proxy(`http://127.0.0.1:${config.getSection("services").items.port}`, {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:${
        config.getSection("services").items.port
      }/api/v1/item${req.url}`,
  })
);

app.use(
  "/api/v1/order",
  proxy(`http://127.0.0.1:${config.getSection("services").orders.port}`, {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:${
        config.getSection("services").orders.port
      }/api/v1/order${req.url}`,
  })
);

app.use(
  "/api/v1/storage",
  proxy(`http://127.0.0.1:${config.getSection("services").storage.port}`, {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:${
        config.getSection("services").storage.port
      }/api/v1/storage${req.url}`,
  })
);

app.use(
  "/api/v1/invoice",
  proxy(`http://127.0.0.1:${config.getSection("services").invoices.port}`, {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:${
        config.getSection("services").invoices.port
      }/api/v1/invoice${req.url}`,
  })
);

app.use(
  "/api/v1/supplier",
  proxy(`http://127.0.0.1:${config.getSection("services").suppliers.port}`, {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:${
        config.getSection("services").suppliers.port
      }/api/v1/supplier${req.url}`,
  })
);

app.use(
  "/api/v1/recent-activity",
  proxy(
    `http://127.0.0.1:${config.getSection("services").recentactivity.port}`,
    {
      proxyReqPathResolver: (req) =>
        `http://127.0.0.1:${
          config.getSection("services").recentactivity.port
        }/api/v1/recent-activity${req.url}`,
    }
  )
);

app.use(
  "/",
  proxy(`http://127.0.0.1:${config.getSection("services").proxy.port}`, {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:${config.getSection("services").proxy.port}/${req.url}`,
  })
);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token");
  }
});

app.use("/", express.static(path.join(__dirname, "/../../../client/src")));

app.listen(config.getSection("services").proxy.port, (err) => {
  if (err) return console.log(err);
  console.log(
    `Server started on port ${config.getSection("services").proxy.port}`
  );
});

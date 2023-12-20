const config = require("../../pkg/config");
require("../../pkg/db");

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");
const storage = require("./handlers/storage");

const api = express();

api.use(express.json());
api.use(fileUpload());
api.use(jwt({
    secret: config.getSection("development").jwt,
    algorithms: ["HS256"]
}));


api.post("/api/v1/storage", storage.upload);
api.get("/api/v1/storage/:filename", storage.download);
api.get("/api/v1/storage", storage.listFiles);
api.delete("/api/v1/storage/:filename", storage.removeFile);

api.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedAccess") {
        res.status(401).send("Invalid token");
    }
});

api.listen(config.getSection("development").port, (err) => {
    if (err) return console.log(err);
    console.log(`Server started on port ${config.getSection("development").port}`);
});
const config = require("../../pkg/config");
require("../../pkg/db");

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const auth = require("./handlers/auth");

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

api.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedAccess"){
        res.status(401).send("Invalid token");
    }
});

api.listen(config.getSection("development").port, (err) => {
    if (err) return console.log(err);
    console.log(`Server started on port ${config.getSection("development").port}`);
});
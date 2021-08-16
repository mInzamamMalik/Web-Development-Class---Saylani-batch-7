const express = require("express");
// const app = express();
var authRoutes = express.Router();

authRoutes.post("/signup", (req, res, next) => {
    res.send("signup success");
});
authRoutes.post("/login", (req, res, next) => {
    res.send("signup success");

    // next();
});
authRoutes.post("/forgetpassword", (req, res, next) => {
    res.send("signup success");
});
authRoutes.post("/changepassword", (req, res, next) => {
    res.send("signup success");
});

module.exports = authRoutes;

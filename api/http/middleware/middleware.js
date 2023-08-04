const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportConfig = require("../../config/passport-config");

module.exports = function appMiddleware(app) {
    app.use(cors());
    app.use(cookieParser());
    app.use(express.urlencoded({ limit: "500mb", extended: true }));
    app.use(express.json({ limit: "500mb", extended: true }));
    app.use(passport.initialize());
    passportConfig(passport);

    // Error management
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    });

    return app;
};
const express = require("express");
const passport = require("passport");
const router = express.Router();

const login = require("../http/controllers/login");
const get_users = require("../http/controllers/users/get_user");
const update_user = require("../http/controllers/users/update_user");
const refresh_user_token = require("../http/controllers/users/refresh_user_token");
const update_user_picture = require("../http/controllers/users/update_user_picture");
const get_user_picture = require("../http/controllers/users/get_user_picture");

const authenticateJWT = passport.authenticate("jwt", { session: false });

router.get("/", get_users);

router.get("/picture/:userid", get_user_picture);

router.post("/login", login);
 
router.post("/", authenticateJWT, update_user, refresh_user_token);

router.patch("/picture", authenticateJWT, update_user_picture);

module.exports = router;
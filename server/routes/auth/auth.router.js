const express = require("express");
const passport = require("passport");

const authController = require("./auth.controller");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/logout/:id", authController.logout);

router.get("/googlelogin", authController.googleLogin);

module.exports = router;

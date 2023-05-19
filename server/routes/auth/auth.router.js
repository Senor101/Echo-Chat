const express = require("express");
const passport = require("passport");

const authController = require("./auth.controller");

const router = express.Router();

router.use(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.use(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  (req, res) => res.redirect(`${process.env.FRONTEND_URL}/chat`)
);

// router.get("/auth", authController.authentication);

module.exports = router;

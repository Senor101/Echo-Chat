const express = require("express");

const authController = require("./auth.controller");

const router = express.Router();

router.get("/auth", authController.authentication);

module.exports = router;

const express = require("express");

const router = express.Router();
const userController = require("./user.controller");

router.post("/setAvatar", userController.setAvatar);

router.get("/allUsers/:id", userController.getAllUsers);

module.exports = router;

const express = require("express");

const userController = require("./user.controller");

const router = express.Router();

router.post("/setavatar/:id", userController.setAvatar);
router.get("/allusers/:id", userController.getAllUsers);

module.exports = router;

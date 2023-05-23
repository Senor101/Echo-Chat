const express = require("express");

const chatController = require("./chat.controller");

const router = express.Router();

router.get("/getmsg", chatController.getMessage);
router.post("/sendmsg", chatController.sendMessage);

module.exports = router;

const express = require("express");

const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const chatRouter = require("./chat/chat.router");

api = express.Router();

api.use("/auth", authRouter);
api.use("/user", userRouter);
api.use("/chat", chatRouter);

module.exports = api;

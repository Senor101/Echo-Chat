const express = require("express");

const authRouter = require("./auth/auth.router");
// const chatRouter = require('./chat/chat.router');

api = express.Router();

api.use("/auth", authRouter);

module.exports = api;

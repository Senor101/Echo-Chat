const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { log } = require("console");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const connectDB = require("./config/db.config");

connectDB();

const startServer = async () => {
  server.listen(PORT, () => {
    log(`Server listening on port ${PORT}`);
  });
};

startServer();

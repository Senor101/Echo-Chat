const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { log } = require("console");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  // await mongoose.connect(process.env.MONGO_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  server.listen(PORT, () => {
    log(`Server listening on port ${PORT}`);
  });
};

startServer();

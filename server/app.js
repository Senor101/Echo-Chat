const express = require("express");
const cors = require("cors");

const APIRoute = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", APIRoute);

module.exports = app;

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection SUCCESS");
  } catch (err) {
    console.log(err);
    // process.exit(1); // stop the process if there is an error in the database connection.
    // The process.exit(1) means that the program will stop and the status code will be 1.
    // This is to avoid the app to continue running if there is a problem with the database connection.
    // The status code 1 means that there is an error in the database connection.
    // The status code 0 means that everything is ok.
    // The status code 2 means that there is a warning.
    // The status code 3 means that there is an information.
    // The status code 4 means that there is a debug.
    // The status code 5 means that there is a trace.
    // The status code 6 means that there is a fatal.
    // The status code 7 means that there is a panic.
    // The status code 8 means that there is a emergency.
    // The status code 9 means that there is a alert.
    // The status code 10 means that there is a critical.
    console.log("Database connection failed.");
  }
};

module.exports = connectDB;

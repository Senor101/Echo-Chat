const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
const socket = require("socket.io");
const MongoStore = require("connect-mongodb-session")(session);
const { Strategy } = require("passport-google-oauth20");
require("dotenv").config();

const APIRoute = require("./routes/api");

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  COOKIE_KEY_1: "randomValue1",
  COOKIE_KEY_2: "randomValue2",
  MONGO_URI: process.env.MONGO_URI,
};

const store = new MongoStore({
  uri: config.MONGO_URI,
  collection: "App_Sessions",
});

const AUTH_OPTIONS = {
  callbackURL: "http://localhost:8000/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log("Google profile", profile);
  done(null, profile);
};
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(
  session({
    secret: "XXXXXXXXXXXX",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/v1/api", APIRoute);

module.exports = app;

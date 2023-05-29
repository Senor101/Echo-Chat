const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
const socket = require("socket.io");
const MongoStore = require("connect-mongodb-session")(session);
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
require("dotenv").config();
const path = require("path");

const APIRoute = require("./routes/api");

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};

const store = new MongoStore({
  uri: config.MONGO_URI,
  collection: "App_session",
});

const AUTH_OPTIONS = {
  callbackURL: "http://localhost:8000/api/v1/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  // console.log("Google profile", profile);
  done(null, profile);
};
passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());
app.use(
  session({
    secret: "XXXXXXXXXXXX",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// app.use(
//   cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
// );

app.use(passport.session());
app.use(passport.initialize());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1", APIRoute);

module.exports = app;

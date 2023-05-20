const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    //TODO: compare paasswords with bcrypt and authorize
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      res.status(402).json({
        message: "Passwords donot match",
      });
    }
    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userNameCheck = User.findOne({ username: email });
    if (userNameCheck) {
      return res.status(409).json({ message: "User alreasy exists" });
    }
    const emailCheck = User.findOne({ email: email });
    if (emailCheck) {
      return res.status(409).json({ message: "Email already in use" });
    }
    //TODO hash password
    hashedPassword = await bcrypt.hash(password, 12);
    User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "new user created",
    });
  } catch (error) {
    console.log(error);
  }
};

const googleLogin = async (req, res, next) => {};

const googleRegister = async (req, res, next) => {};

const normalAuth = async (req, res, next) => {};

module.exports = {
  authentication,
  googleAuthentication,
};

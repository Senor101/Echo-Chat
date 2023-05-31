const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        msg: "Invalid credentials",
        status: false,
      });
    }
    //TODO: compare paasswords with bcrypt and authorize
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(402).json({
        msg: "Passwords donot match",
        status: false,
      });
    }
    delete user.password;
    return res.status(200).json({
      msg: "Login successful",
      status: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userNameCheck = await User.findOne({ username });
    if (userNameCheck) {
      return res
        .status(409)
        .json({ msg: "User already exists", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res
        .status(409)
        .json({ msg: "Email already in use", status: false });
    }
    //TODO hash password
    hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await delete user.password;
    return res.status(201).json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res
      .status(200)
      .json({ msg: "User logout successful", status: true });
  } catch (error) {
    console.log(error);
  }
};

const googleLogin = async (req, res, next) => {
  try {
    // console.log(req.session.user);
    // if (req.session.user) {
    //   res.status(200).json({
    //     status: true,
    //     msg: "success",
    //     user: req.session.user,
    //   });
    // }
    const userProfile = req.session.user;
    console.log(userProfile);
    const userName = userProfile.given_name;
    const email = userProfile.email;
    const user = await User.findOne({ username: userName });
    console.log(user);
    if (user) {
      return res
        .status(200)
        .json({ msg: "Login Successful", status: true, user, google: true });
    } else {
      const emailCheck = await User.findOne({ email });
      if (!emailCheck) {
        const user = await User.create({
          username: userName,
          email: email,
          password: "XXXXXXXXXXXXXXX",
        });
        return res
          .status(201)
          .json({ msg: "register", status: true, user, google: true });
      } else {
        return res.status(500).json({ status: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  register,
  logout,
  googleLogin,
};

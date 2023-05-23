const User = require("../../models/user.model");

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage: avatarImage,
      },
      {
        new: true,
      }
    );
    // console.log(userData);
    return res
      .status(201)
      .json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const users = await User.find({ _id: { $ne: userId } }).select([
      "email",
      "username",
      "avatar",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setAvatar,
  getAllUsers,
};

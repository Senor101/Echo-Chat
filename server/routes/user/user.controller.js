const User = require("../../models/user.model");

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      {
        new: true,
      }
    );
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
    const users = await User.find({ _id: { $nt: userId } }).select([
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

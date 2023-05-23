const Message = require("../../models/message.model");

const getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectedMessage = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });
    res.status(200).json(projectedMessage);
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async (req, res, next) => {
  const { from, to, message } = req.body;
  const data = await Message.create({
    message: {
      text: message,
    },
    users: [from, to],
    sender: from,
  });
};

module.exports = {
  getMessage,
  sendMessage,
};
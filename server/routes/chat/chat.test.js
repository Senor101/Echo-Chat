const Message = require("../../models/message.model");
const controllers = require("./chat.controller");

jest.mock("../../models/message.model");

describe("sendMessage Function", () => {
  test("should add a new message to the database", async () => {
    const mockReq = {
      body: {
        from: "user1",
        to: "user2",
        message: "Hello",
      },
    };
    const mockRes = {
      json: jest.fn(),
    };
    const mockMessage = {
      _id: "message1",
      sender: "user1",
      users: ["user1", "user2"],
      message: {
        text: "Hello",
      },
    };
    Message.create.mockResolvedValueOnce(mockMessage);

    await controllers.sendMessage(mockReq, mockRes);

    expect(Message.create).toHaveBeenCalledWith({
      message: {
        text: "Hello",
      },
      users: ["user1", "user2"],
      sender: "user1",
    });
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "Message added successfully.",
    });
  });
});

const Message = require("../../models/message.model");
const controllers = require("./chat.controller");

jest.mock("../../models/message.model");

// describe("Message Controller Tests", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
// });

// describe("getMessage Function", () => {
//   test("should return the projected messages", async () => {
//     const mockRequest = mockReq("user1", "user2");
//     const expectedResponse = [
//       {
//         fromSelf: true,
//         message: "Hello",
//       },
//       {
//         fromSelf: false,
//         message: "Hi",
//       },
//     ];

//     await controllers.getMessage(mockRequest, mockRes);

//     expect(Message.find).toHaveBeenCalledWith({
//       users: {
//         $all: ["user1", "user2"],
//       },
//     });
//     expect(Message.sort).toHaveBeenCalledWith({ updatedAt: 1 });
//     expect(Message.exec).toHaveBeenCalled();
//     expect(mockRes.status).toHaveBeenCalled(); // Check if status() is called
//     expect(mockRes.status.mock.calls[0][0]).toBe(200); // Verify the value passed to status()
//     expect(mockRes.json).toHaveBeenCalledWith(expectedResponse);
//   });

//   test("should handle errors and log them", async () => {
//     const mockReq = {
//       body: {
//         from: "user1",
//         to: "user2",
//       },
//     };
//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     Message.find.mockRejectedValueOnce(mockError);

//     const consoleSpy = jest.spyOn(console, "log");

//     await controllers.getMessage(mockReq, mockRes);

//     expect(Message.find).toHaveBeenCalledWith({
//       users: {
//         $all: ["user1", "user2"],
//       },
//     });
//     expect(consoleSpy).toHaveBeenCalledWith(mockError);
//   });
// });

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

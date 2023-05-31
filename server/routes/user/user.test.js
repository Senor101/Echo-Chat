const User = require("../../models/user.model");
const controllers = require("./user.controller");

// Mock User.findByIdAndUpdate function
jest.mock("../../models/user.model", () => ({
  findByIdAndUpdate: jest.fn(),
  find: jest.fn(),
}));

describe("Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("setAvatar Function", async () => {
    const mockReq = {
      params: {
        id: "123456",
      },
      body: {
        image: "avatar.png",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findByIdAndUpdate to return updated user data
    User.findByIdAndUpdate.mockResolvedValueOnce({
      isAvatarImageSet: true,
      avatarImage: "avatar.png",
    });

    await controllers.setAvatar(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      isSet: true,
      image: "avatar.png",
    });
  });

  test("getAllUsers Function", async () => {
    const mockReq = {
      params: {
        id: "123456",
      },
    };

    const mockRes = {
      json: jest.fn(),
    };

    // Mock User.find to return an array of users
    User.find.mockReturnValueOnce({
      select: jest.fn().mockResolvedValueOnce([
        {
          _id: "111111",
          username: "user1",
          email: "user1@example.com",
          avatar: "avatar1.png",
        },
        {
          _id: "222222",
          username: "user2",
          email: "user2@example.com",
          avatar: "avatar2.png",
        },
      ]),
    });

    await controllers.getAllUsers(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith([
      {
        _id: "111111",
        username: "user1",
        email: "user1@example.com",
        avatar: "avatar1.png",
      },
      {
        _id: "222222",
        username: "user2",
        email: "user2@example.com",
        avatar: "avatar2.png",
      },
    ]);
  });
});

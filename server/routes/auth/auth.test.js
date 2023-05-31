const bcrypt = require("bcrypt");
const controllers = require("./auth.controller");
const User = require("../../models/user.model");

// Mock User.findOne function
jest.mock("../../models/user.model");

describe("Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Login Function - Valid Credentials", async () => {
    const mockReq = {
      body: {
        username: "testuser",
        password: "testpassword",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return a user object
    User.findOne.mockResolvedValueOnce({
      username: "testuser",
      password: bcrypt.hashSync("testpassword", 10),
    });

    await controllers.login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "Login successful",
      status: true,
      user: {
        username: "testuser",
      },
    });
  });

  test("Login Function - Invalid Credentials", async () => {
    const mockReq = {
      body: {
        username: "testuser",
        password: "testpassword",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return null
    User.findOne.mockResolvedValueOnce(null);

    await controllers.login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "Invalid credentials",
      status: false,
    });
  });

  test("Register Function - New User", async () => {
    const mockReq = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "testpassword",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return null for both username and email
    User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

    // Mock bcrypt.hash
    bcrypt.hash = jest.fn().mockResolvedValue("hashedpassword");

    // Mock User.create
    User.create.mockResolvedValueOnce({
      username: "testuser",
      email: "test@example.com",
      password: "hashedpassword",
    });

    await controllers.register(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: true,
      user: {
        username: "testuser",
        email: "test@example.com",
      },
    });
  });

  test("Register Function - Existing Username", async () => {
    const mockReq = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "testpassword",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return an existing user object for username
    User.findOne.mockResolvedValueOnce({
      username: "testuser",
      email: "existinguser@example.com",
    });

    await controllers.register(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "User already exists",
      status: false,
    });
  });

  test("GoogleLogin Function - Existing User", async () => {
    const mockReq = {
      session: {
        user: {
          given_name: "testuser",
          email: "test@example.com",
        },
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return an existing user object for username
    User.findOne.mockResolvedValueOnce({
      username: "testuser",
      email: "test@example.com",
    });

    await controllers.googleLogin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "Login Successful",
      status: true,
      user: {
        username: "testuser",
        email: "test@example.com",
      },
      google: true,
    });
  });

  test("GoogleLogin Function - New User", async () => {
    const mockReq = {
      session: {
        user: {
          given_name: "testuser",
          email: "test@example.com",
        },
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return null for username and email
    User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

    // Mock User.create
    User.create.mockResolvedValueOnce({
      username: "testuser",
      email: "test@example.com",
      password: "XXXXXXXXXXXXXXX",
    });

    await controllers.googleLogin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "register",
      status: true,
      user: {
        username: "testuser",
        email: "test@example.com",
        password: "XXXXXXXXXXXXXXX",
      },
      google: true,
    });
  });
});

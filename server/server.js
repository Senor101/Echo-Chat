const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { Server } = require("socket.io");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const connectDB = require("./config/db.config");

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

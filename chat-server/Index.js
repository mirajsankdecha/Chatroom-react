const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
  method: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  socket.on("Join Room", (data) => {
    socket.join(data);
  });
  socket.on("Send Message", (data) => {
    socket.to(data.room).emit("Receive Message", data);
  });
});

server.listen(3001, () => {
  console.log("Server Running on Port 3001");
});

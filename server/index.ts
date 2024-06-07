const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: "*", // Change this for production
  },
});

io.on("connection", (socket) => {
  console.log("Websocket connection established");
  socket.on("input", (message: string) => {
    socket.broadcast.emit("input", message);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});

const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
};

const emitProgress = (progress) => {
  if (io) {
    io.emit("uploadProgress", progress);
  }
};

module.exports = {
  initSocket,
  emitProgress,
};
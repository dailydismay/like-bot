require("dotenv").config();

const http = require("http");
const connectToDb = require("./database");
const appCallback = require("./app");
const setupQueue = require("./api/likes/likes.queue");
const socketIo = require("socket.io");

const bootstrap = async () => {
  await connectToDb();

  const server = http.createServer(appCallback);
  const io = socketIo(server);
  server.listen(process.env.PORT || 3000, () => setupQueue(io));
};

module.exports = bootstrap();

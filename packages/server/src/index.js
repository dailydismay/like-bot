require("dotenv").config();

const http = require("http");
const connectToDb = require("./database");
const appCallback = require("./app");

const bootstrap = async () => {
  await connectToDb();
  http.createServer(appCallback).listen(process.env.PORT || 3000);
};

bootstrap();

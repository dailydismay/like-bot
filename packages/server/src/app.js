const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const api = require("./api");
const cors = require("@koa/cors");

module.exports = new Koa()
  .use(cors())
  .use(bodyParser())
  .use(api.routes())
  .callback();

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const api = require("./api");

module.exports = new Koa()
  .use(bodyParser())
  .use(api.routes())
  .callback();

const Router = require("koa-router");
const credsRouter = require("./creds");
const likesRouter = require("./likes");

module.exports = new Router()
  .use(credsRouter.allowedMethods())
  .use(credsRouter.routes())
  .use(likesRouter.allowedMethods())
  .use(likesRouter.routes());

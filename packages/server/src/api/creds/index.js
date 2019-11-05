const Router = require("koa-router");
const credsModel = require("./creds.model");

module.exports = new Router({
  prefix: "/creds"
}).post("/", async ctx => {
  const { email, password } = ctx.request.body;

  const data = await credsModel.create({
    email,
    password
  });

  ctx.body = data;
});

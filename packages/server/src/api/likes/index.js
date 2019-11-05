const Router = require("koa-router");
const credsModel = require("../creds/creds.model");
const queue = require("./likes.queue");

module.exports = new Router({
  prefix: "/likes"
}).post("/", async ctx => {
  const { page_url } = ctx.request.body;

  const allCreds = await credsModel.find();

  allCreds.forEach(creds => {
    queue.add({
      creds,
      page_url
    });
  });

  ctx.body = {
    success: true,
    message: `Likes for ${page_url} are being processed.`
  };
});

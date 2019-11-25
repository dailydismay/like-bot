const Router = require("koa-router");
const credsModel = require("../creds/creds.model");
const likesModel = require("./likes.model");
const queue = require("./likes.queue");

module.exports = new Router({
  prefix: "/likes"
})
  .get("/:id", async ctx => {
    const data = await likesModel.findById(ctx.params.id).populate({
      path: "creds"
    });

    ctx.body = data;
  })
  .get("/", async ctx => {
    const items = await likesModel.find();

    const total = await likesModel.count();

    ctx.body = {
      items,
      total
    };
  })
  .delete("/:id", async ctx => {
    await likesModel.findByIdAndDelete(ctx.params.id);

    ctx.status = 204;
  })
  .post("/", async ctx => {
    const { page_url, total } = ctx.request.body;

    await likesModel.create({
      page_url,
      total
    });

    const allCreds = await credsModel.find();

    allCreds.forEach(creds => {
      queue.add({
        creds,
        page_url
      });
    });

    const message = `Likes for ${page_url} are being processed`;

    console.log(message);

    ctx.body = {
      success: true,
      message
    };
  });

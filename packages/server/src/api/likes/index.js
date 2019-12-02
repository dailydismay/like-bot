const Router = require("koa-router");
const validate = require("../../core/middleware/validation");
const schema = require("./likes.dto");

const credsModel = require("../creds/creds.model");
const likesModel = require("./likes.model");
const { queue } = require("./likes.queue");

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
    const items = await likesModel.find().sort("-createdAt");

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
  .post("/", validate(schema, "request.body"), async ctx => {
    const { page_url, delay } = ctx.request.body;

    const like = await likesModel.create({
      page_url,
      delay
    });

    const allCreds = await credsModel.find();

    allCreds.forEach((creds, idx) => {
      queue.add(
        {
          creds,
          page_url
        },
        {
          delay: delay * 3600 * ++idx,
          attempts: 2
        }
      );
    });

    ctx.body = like;
  });

const Router = require("koa-router");
const HttpError = require("../../core/error");
const credsModel = require("./creds.model");
const schema = require("./creds.dto");
const validate = require("../../core/middleware/validation");

module.exports = new Router({
  prefix: "/creds"
})
  .get("/", async ctx => {
    const { page = 0, perPage = 40 } = ctx.params;

    const [items, total] = await Promise.all([
      credsModel
        .find()
        .skip(page * perPage)
        .limit(perPage)
        .exec(),
      credsModel.count()
    ]);

    ctx.body = {
      items,
      total
    };
  })
  .get("/:id", async ctx => {
    const credsFound = await credsModel.findById(ctx.params.id);

    if (!credsFound) {
      throw new HttpError("Creds were not found", 404);
    }

    ctx.body = credsFound;
  })
  .patch("/:id", async ctx => {
    const credsFound = await credsModel.findById(ctx.params.id);

    if (!credsFound) {
      throw new HttpError("Creds were not found", 404);
    }

    await credsModel.updateOne(
      {
        _id: credsFound._id
      },
      ctx.request.body
    );

    ctx.status = 202;
  })
  .delete("/:id", async ctx => {
    const credsFound = await credsModel.findById(ctx.params.id);

    if (!credsFound) {
      throw new HttpError("Creds were not found", 404);
    }

    await credsModel.deleteOne({
      _id: credsFound._id
    });

    ctx.status = 204;
  })
  .post("/", validate(schema, "request.body"), async ctx => {
    const { email, password } = ctx.request.body;

    const data = await credsModel.create({
      email,
      password
    });

    ctx.body = data;
  });

const HttpError = require("../../core/error");
const credsModel = require("./creds.model");

const create = async ctx => {
  const { email, password } = ctx.request.body;

  const data = await credsModel.create({
    email,
    password
  });

  ctx.body = data;
};

const list = async ctx => {
  const { page = 0, perPage = 40 } = ctx.params;

  const [items, total] = await Promise.all([
    credsModel
      .find()
      .skip(page * perPage)
      .limit(perPage)
      .sort("-createdAt")
      .exec(),
    credsModel.count()
  ]);

  ctx.body = {
    items,
    total
  };
};

const show = async ctx => {
  const credsFound = await credsModel.findById(ctx.params.id);

  if (!credsFound) {
    throw new HttpError("Creds were not found", 404);
  }

  ctx.body = credsFound;
};

const update = async ctx => {
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
};

const deleteOne = async ctx => {
  const credsFound = await credsModel.findById(ctx.params.id);

  if (!credsFound) {
    throw new HttpError("Creds were not found", 404);
  }

  await credsModel.deleteOne({
    _id: credsFound._id
  });

  ctx.status = 204;
};

module.exports = { list, show, update, deleteOne, create };

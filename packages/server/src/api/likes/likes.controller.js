const credsModel = require("../creds/creds.model");
const likesModel = require("./likes.model");
const { queue } = require("./likes.queue");

const create = async ctx => {
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
        delay: delay * 3600 * ++idx
      }
    );
  });

  ctx.body = like;
};

const show = async ctx => {
  const data = await likesModel.findById(ctx.params.id).populate({
    path: "creds"
  });

  ctx.body = data;
};

const list = async ctx => {
  const items = await likesModel.find().sort("-createdAt");

  const total = await likesModel.count();

  ctx.body = {
    items,
    total
  };
};

const deleteOne = async ctx => {
  await likesModel.findByIdAndDelete(ctx.params.id);

  ctx.status = 204;
};

module.exports = { list, show, deleteOne, create };

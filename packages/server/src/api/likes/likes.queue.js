const credsModel = require("../creds/creds.model");
const Queue = require("bull");
const likesModel = require("./likes.model");
const likesService = require("./likes.service");

const likesQueue = new Queue("likes queue", {
  // limiter: {
  //   // duration: 30 * 60 * 1000,
  //   max: 1
  // },
  redis: process.env.REDIS_URI
});

likesQueue.process(async ({ data }, done) => {
  const creds = await credsModel.findOne({
    ...data.creds
  });

  const likes = await likesModel.findOne({
    page_url: data.page_url
  });

  if (!likes.creds || !likes.creds.find(x => x._id == creds._id)) {
    likes.creds.push(creds);

    likes.count++;

    await likes.save();

    await likesService(data);
  }

  return done();
});

module.exports = likesQueue;

const credsModel = require("../creds/creds.model");
const Queue = require("bull");
const likesModel = require("./likes.model");
const likesService = require("./likes.service");

const likesQueue = new Queue("likes queue", {
  redis: process.env.REDIS_URI
});

module.exports = io => {
  likesQueue.process(async ({ data }, done) => {
    try {
      const creds = await credsModel.findOne({
        ...data.creds
      });

      const likes = await likesModel.findOne({
        page_url: data.page_url
      });

      if (
        likes &&
        (!likes.creds || !likes.creds.find(x => x._id == creds._id))
      ) {
        likes.creds.push(creds);

        if (likes.count < likes.creds.length) {
          likes.count++;
        }

        await likes.save();

        await likesService(data);

        io.emit("CREDS_USED", { ...data.creds, page_url: data.page_url });
      }

      return done();
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports.queue = likesQueue;

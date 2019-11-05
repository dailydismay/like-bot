const Queue = require("bull");
const likesQueue = new Queue("likes queue", {
  limiter: {
    duration: 30 * 60 * 1000,
    max: 1
  },
  redis: process.env.REDIS_URI
});

const likesService = require("./likes.service");

likesQueue.process(async ({ data }, done) => {
  await likesService(data);
  return done();
});

module.exports = likesQueue;

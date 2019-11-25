const objectPath = require("../objectPath");
const validate = require("../validate");

module.exports = (schema, path) => async (ctx, next) => {
  const data = objectPath(path, ctx);
  await validate(data, schema);

  return next();
};

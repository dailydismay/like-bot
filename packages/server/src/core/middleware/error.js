module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const status = error.code || 500;

    const message = status === 500 ? "Internal error" : error.message;

    const timestamp = new Date();

    const path = ctx.path;

    ctx.status = status;

    ctx.body = {
      message,
      status,
      timestamp,
      path
    };
  }
};

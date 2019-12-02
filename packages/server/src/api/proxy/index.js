const Router = require("koa-router");
const proxyModel = require("./proxy.model");

module.exports = new Router({
  prefix: "/proxy"
})
  .get("/", async ctx => {
    const [currentProxy] = await proxyModel.find();

    if (currentProxy) {
      return (ctx.body = {
        currentProxy: currentProxy.url
      });
    }

    ctx.status = 204;
  })
  .post("/", async ctx => {
    const { proxy } = ctx.query;

    let [proxyFound] = await proxyModel.find();

    if (proxyFound) {
      await proxyModel.updateMany(
        {},
        {
          url: proxy
        }
      );
      return (ctx.status = 201);
    }

    await proxyModel.create({
      url: proxy
    });

    ctx.status = 202;
    ctx.body = {
      currentProxy: proxy
    };
  });

const Router = require("koa-router");
const schema = require("./creds.dto");
const validate = require("../../core/middleware/validation");
const credsController = require("./creds.controller");

module.exports = new Router({
  prefix: "/creds"
})
  .get("/", credsController.list)
  .post("/", validate(schema, "request.body"), credsController.create)
  .get("/:id", credsController.show)
  .delete("/:id", credsController.deleteOne)
  .patch("/:id", credsController.update);

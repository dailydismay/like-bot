const Router = require("koa-router");
const validate = require("../../core/middleware/validation");
const schema = require("./likes.dto");

const likesController = require("./likes.controller");

module.exports = new Router({
  prefix: "/likes"
})
  .get("/", likesController.list)
  .post("/", validate(schema, "request.body"), likesController.create)
  .get("/:id", likesController.show)
  .delete("/:id", likesController.deleteOne);

const joi = require("joi");

module.exports = joi.object().keys({
  page_url: joi
    .string()
    .uri()
    .required(),
  delay: joi.number().required()
});

const joi = require("joi");
const HttpError = require("./error");

module.exports = (obj, schema) =>
  new Promise((resolve, reject) => {
    joi.validate(obj, schema, err => {
      if (err) {
        reject(new HttpError("Unprocessable Entity", 422));
      }
      resolve("<3 Sanechka, no one will get what that promise resolves.");
    });
  });

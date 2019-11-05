const { Schema, model } = require("mongoose");

const credsSchema = new Schema({
  email: String,
  password: String
});

module.exports = model("creds", credsSchema);

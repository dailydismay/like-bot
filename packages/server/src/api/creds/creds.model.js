const { Schema, model } = require("mongoose");

const credsSchema = new Schema(
  {
    email: String,
    password: String
  },
  {
    timestamps: true
  }
);

module.exports = model("creds", credsSchema);

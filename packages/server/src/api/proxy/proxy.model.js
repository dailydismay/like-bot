const { Schema, model } = require("mongoose");

const proxySchema = new Schema(
  {
    url: String
  },
  {
    timestamps: true
  }
);

module.exports = model("proxy", proxySchema);

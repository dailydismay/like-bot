const { Schema, model } = require("mongoose");

const likesSchema = new Schema(
  {
    page_url: String,
    total: Number,
    count: {
      type: Number,
      default: 0
    },
    creds: [
      {
        type: Schema.Types.ObjectId,
        ref: "creds"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("likes", likesSchema);

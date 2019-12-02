const { Schema, model } = require("mongoose");

const likesSchema = new Schema(
  {
    page_url: String,
    count: {
      type: Number,
      default: 0
    },
    delay: Number,
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

const mongoose = require("mongoose");

module.exports = (uri = process.env.MONGO_URI) =>
  mongoose.connect(uri, {
    useNewUrlParser: true
  });

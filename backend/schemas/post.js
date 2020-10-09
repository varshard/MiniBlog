const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: String,
    content: String,
    status: String,
    category: String,
    edited: Date,
    author: String,
  },
  { collection: "Post" }
);

module.exports = schema;

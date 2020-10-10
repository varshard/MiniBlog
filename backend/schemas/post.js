const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema(
  {
    name: String,
    content: String,
    status: String,
    category: String,
    edited: Date,
    author: {
      _id: Schema.Types.ObjectId,
      name: String,
    },
    key: String,
  },
  { collection: "Post" }
);

module.exports = schema;

const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: String,
    password: String,
    key: String,
  },
  { collection: "Author" }
);

module.exports = schema;

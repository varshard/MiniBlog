const mongoose = require("mongoose");
module.exports = {
  async truncate() {
    await mongoose.connection.collections["Author"].drop();
    await mongoose.connection.collections["Post"].drop();
  },
};

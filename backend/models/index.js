const PostSchema = require("../schemas/post");
const AuthorSchema = require("../schemas/author");

const createModel = (mongoose, modelName, schema) => {
  return mongoose.model(modelName, schema);
};

/**
 * Create Mongoose models out of schemas
 * @param mongoose
 * @returns {{Post: *}}
 */
const initModels = (mongoose) => {
  return {
    Post: createModel(mongoose, "Post", PostSchema),
    Author: createModel(mongoose, "Author", AuthorSchema),
  };
};

module.exports = initModels;

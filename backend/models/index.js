const PostSchema = require("../schemas/post");

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
  };
};

module.exports = initModels;

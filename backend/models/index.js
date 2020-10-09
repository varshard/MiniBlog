const PostSchema = require("../schemas/post");

const createModel = (mongoose, modelName, schema) => {
  return mongoose.model(modelName, schema);
};

const initModels = (mongoose) => {
  return {
    Post: createModel(mongoose, "Post", PostSchema),
  };
};

module.exports = initModels;

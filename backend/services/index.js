const Authentication = require("./authentication");
const Posts = require("./posts");

function initServices(models) {
  return {
    authenticationService: new Authentication(),
    postsService: new Posts(models),
  };
}

module.exports = initServices;

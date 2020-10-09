const Authentication = require("./authentication");
const Posts = require("./posts");

/**
 * Initialize service layer
 * @param models
 * @returns {{authenticationService: Authentication, postsService: Posts}}
 */
function initServices(models) {
  return {
    authenticationService: new Authentication(),
    postsService: new Posts(models),
  };
}

module.exports = initServices;

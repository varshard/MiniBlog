const Authentication = require("./authentication");
const Posts = require("./posts");
const Authors = require("./authors");

/**
 * Initialize service layer
 * @param models
 * @returns {{authenticationService: Authentication, postsService: Posts}}
 */
function initServices(models) {
  const authenticationService = new Authentication(models);
  return {
    authenticationService,
    postsService: new Posts(models, authenticationService),
    authorService: new Authors(models, authenticationService),
  };
}

module.exports = initServices;

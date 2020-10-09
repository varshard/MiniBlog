const initLoginRoutes = require("./login");
const initPostsRoutes = require("./posts");

module.exports = function initRoutes(app, services) {
  const login = initLoginRoutes(services);
  const postsRoutes = initPostsRoutes(services);

  app.use(login);
  app.use("/posts", postsRoutes);
};

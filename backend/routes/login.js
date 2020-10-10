const express = require("express");
const UsernameUnavailable = require("../errors/UsernameUnavailable");
const UnauthorizedUser = require("../errors/UnauthorizedUser");

function initRoutes(services) {
  const router = express.Router();
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const author = await services.authenticationService.authenticate(
        username,
        password
      );
      res.json({ token: author.key });
    } catch (err) {
      if (err instanceof UnauthorizedUser) {
        res.status(403);
        return res.send(err.message);
      }
      res.sendStatus(500);
    }
  });

  router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
      const author = await services.authorService.registerAuthor(
        username,
        password
      );
      res.json({ token: author.key });
    } catch (err) {
      if (err instanceof UsernameUnavailable) {
        res.status(400);
        return res.send(err.message);
      }
      res.sendStatus(500);
    }
  });

  return router;
}

module.exports = initRoutes;

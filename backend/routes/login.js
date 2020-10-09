const express = require("express");

function initRoutes(services) {
  const router = express.Router();
  router.post("/login", async (req, res) => {
    const { username } = req.body;

    const token = await services.authenticationService.authenticate(username);
    res.send({ token });
  });

  return router;
}

module.exports = initRoutes;

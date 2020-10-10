const express = require("express");

const PostNotFound = require("../errors/PostNotFound");
const UnauthorizedUser = require("../errors/UnauthorizedUser");

function initRoutes(services) {
  const router = express.Router();
  const postService = services.postsService;

  router.get("/", async (req, res) => {
    try {
      const posts = await postService.getPosts(req.header("Authorization"));
      res.json({ posts });
    } catch (err) {
      res.sendStatus(500);
    }
  });

  router.post("/", async (req, res) => {
    const key = req.header("Authorization");
    try {
      const post = await postService.createPost(req.body, key);
      return res.json(post);
    } catch (err) {
      if (err instanceof UnauthorizedUser) {
        return res.status(403).send(err.message);
      }
      return res.sendStatus(500);
    }
  });

  router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const key = req.header("Authorization");
    const { body } = req;
    try {
      const post = await postService.editPost(id, key, body);
      return res.json(post);
    } catch (err) {
      if (err instanceof UnauthorizedUser) {
        return res.status(403).send(err.message);
      }
      if (err instanceof PostNotFound) {
        return res.status(404).send(err.message);
      }
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const key = req.header("Authorization");
    try {
      const post = await postService.removePost(id, key);
      return res.json(post);
    } catch (err) {
      if (err instanceof UnauthorizedUser) {
        return res.status(403).send(err.message);
      } else if (err instanceof PostNotFound) {
        return res.status(404).send(err.message);
      }
    }
  });

  return router;
}

module.exports = initRoutes;

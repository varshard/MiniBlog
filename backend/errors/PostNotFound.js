class PostNotFound extends Error {
  constructor() {
    super("post not found");
  }
}

module.exports = PostNotFound;

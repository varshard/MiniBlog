const PostNotFound = require("../errors/PostNotFound");
const UnauthorizedUser = require("../errors/UnauthorizedUser");

function validateAuthorization(authorization) {
  if (!authorization || !authorization.trim()) {
    throw new UnauthorizedUser();
  }
}

class Posts {
  constructor(models, authentication) {
    this.PostModel = models.Post;
    this.authentication = authentication;
  }

  async authenticateKey(key) {
    return this.authentication.authenticateKey(key);
  }

  async getPosts(key) {
    const posts = await this.PostModel.find().sort({ edited: "desc" }).lean();
    const author = await this.authenticateKey(key);

    return posts.map((post) => {
      if (post.author._id === author._id) {
        post.editable = true;
      }
      return post;
    });
  }

  async createPost(postPayload, key) {
    validateAuthorization(key);
    const author = await this.authenticateKey(key);
    const post = new this.PostModel({
      ...postPayload,
      edited: new Date(),
      author: {
        _id: author._id,
        name: author.name,
      },
    });

    return post.save();
  }

  async editPost(id, key, postPayload) {
    const updatedPostBody = { ...postPayload };

    delete updatedPostBody.author;
    validateAuthorization(key);
    const author = await this.authenticateKey(key);
    const post = await this.PostModel.findOneAndUpdate(
      { _id: id, "author._id": author._id },
      {
        ...updatedPostBody,
        edited: new Date(),
      },
      { new: true }
    );
    if (!post) {
      throw new PostNotFound();
    }
    return post;
  }

  async removePost(id, key) {
    validateAuthorization(key);
    const author = await this.authenticateKey(key);
    const post = await this.PostModel.findOneAndRemove({
      _id: id,
      "author._id": author._id,
    });
    if (!post) {
      throw new PostNotFound();
    }
  }
}

module.exports = Posts;

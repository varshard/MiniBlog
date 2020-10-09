const atob = require("atob");
const PostNotFound = require("../errors/PostNotFound");
const UnauthorizedUser = require("../errors/UnauthorizeUser");

function validateAuthorization(authorization) {
  if (!authorization || !authorization.trim()) {
    throw new UnauthorizedUser();
  }
}

function decodeAuthor(key) {
  validateAuthorization(key);
  return atob(key);
}

class Posts {
  constructor(models) {
    this.PostModel = models.Post;
  }

  getPosts() {
    return this.PostModel.find().sort({ edited: "desc" }).exec();
  }

  async createPost(postPayload, key) {
    const post = new this.PostModel({
      ...postPayload,
      edited: new Date(),
      author: decodeAuthor(key),
    });

    return post.save();
  }

  async editPost(id, key, postPayload) {
    const updatedPostBody = { ...postPayload };

    delete updatedPostBody.author;
    const author = decodeAuthor(key);
    const post = await this.PostModel.findOneAndUpdate(
      { _id: id, author },
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
    const author = decodeAuthor(key);
    const post = await this.PostModel.findOneAndRemove({
      _id: id,
      author,
    });
    if (!post) {
      throw new PostNotFound();
    }
  }
}

module.exports = Posts;

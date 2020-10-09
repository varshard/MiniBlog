const atob = require("atob");
const PostNotFound = require("../errors/PostNotFound");
const UnauthorizedUser = require("../errors/UnauthorizeUser");

function validateAuthorization(authorization) {
  if (!authorization || !authorization.trim()) {
    throw new UnauthorizedUser();
  }
}

function decodeAuthor(key) {
  return atob(key);
}

class Posts {
  constructor(models) {
    this.PostModel = models.Post;
  }

  async getPosts(key) {
    let author;
    if (key) {
      author = decodeAuthor(key);
    }
    const posts = await this.PostModel.find().sort({ edited: "desc" }).lean();

    return posts.map((post) => {
      if (post.author === author) {
        post.editable = true;
      }
      return post;
    });
  }

  async createPost(postPayload, key) {
    validateAuthorization(key);
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
    validateAuthorization(key);
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
    validateAuthorization(key);
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

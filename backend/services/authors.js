const UsernameUnavailable = require("../errors/UsernameUnavailable");

class Authors {
  constructor(models, authentication) {
    this.AuthorModel = models.Author;
    this.authentication = authentication;
  }

  async findAuthorByKey(key) {
    return this.AuthorModel.findOne({ key });
  }

  async registerAuthor(name, password) {
    const authorExist = (await this.AuthorModel.countDocuments({ name })) > 0;
    if (authorExist) {
      throw new UsernameUnavailable();
    }

    const hashedPw = await this.authentication.hashPassword(password);
    const key = this.authentication.generateKey(name);
    const newAuthor = new this.AuthorModel({ name, password: hashedPw, key });
    return newAuthor.save();
  }
}

module.exports = Authors;

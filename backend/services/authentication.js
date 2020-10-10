const crypto = require("crypto");
const bcrypt = require("bcrypt");
const config = require("../config");
const UnauthorizedUser = require("../errors/UnauthorizedUser");

class Authentication {
  constructor(models) {
    this.AuthorModel = models.Author;
  }
  /**
   * Generate a random password based on a given username(salt)
   * @param salt
   * @returns {Promise<String>}
   */
  generateKey(salt) {
    return crypto
      .pbkdf2Sync(config.secret, salt, 5000, 64, "sha256")
      .toString("hex");
  }

  async authenticate(username, password) {
    const author = await this.AuthorModel.findOne({
      name: username,
    });
    if (!author) {
      throw new UnauthorizedUser();
    }
    const valid = await bcrypt.compare(password, author.password);
    if (!valid) {
      throw new UnauthorizedUser();
    }
    return author;
  }

  async authenticateKey(key) {
    const author = await this.AuthorModel.findOne({ key });
    if (!author) {
      throw new UnauthorizedUser();
    }

    return author;
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
}

module.exports = Authentication;

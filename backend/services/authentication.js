const btoa = require("btoa");

class Authentication {
  /**
   * Create base64 of username as a password
   * @param username
   * @returns {Promise<String>}
   */
  async authenticate(username) {
    return btoa(username);
  }
}

module.exports = Authentication;

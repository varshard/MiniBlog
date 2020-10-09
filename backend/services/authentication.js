const btoa = require("btoa");

class Authentication {
  async authenticate(username) {
    return btoa(username);
  }
}

module.exports = Authentication;

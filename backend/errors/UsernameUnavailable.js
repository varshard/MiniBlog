class UsernameUnavailable extends Error {
  constructor() {
    super("username is unavailable");
  }
}

module.exports = UsernameUnavailable;

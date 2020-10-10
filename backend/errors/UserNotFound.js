class UserNotFound extends Error {
  constructor() {
    super("user not found");
  }
}

module.exports = UserNotFound;

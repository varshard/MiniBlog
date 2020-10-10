class UnauthorizedUser extends Error {
  constructor() {
    super("unauthorized access");
  }
}

module.exports = UnauthorizedUser;

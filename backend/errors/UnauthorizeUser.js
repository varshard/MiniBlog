class UnauthorizeUser extends Error {
  constructor() {
    super("unauthorized access");
  }
}

module.exports = UnauthorizeUser;

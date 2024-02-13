const MyError = require('./MyError');

class AuthorizationError extends MyError {
  constructor() {
    super('Not Authorized', 401);
  }
}

module.exports = AuthorizationError;

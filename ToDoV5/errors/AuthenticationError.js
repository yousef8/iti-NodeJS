const MyError = require('./MyError');

class AuthenticationError extends MyError {
  constructor() {
    super('Not Authorized', 401);
  }
}

module.exports = AuthenticationError;

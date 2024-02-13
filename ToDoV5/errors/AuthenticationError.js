const MyError = require('./MyError');

class AuthenticationError extends MyError {
  constructor() {
    super('Failed Authentication', 401);
  }
}

module.exports = AuthenticationError;

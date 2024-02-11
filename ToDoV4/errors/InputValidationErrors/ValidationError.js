const MyError = require('../MyError');

class ValidationError extends MyError {
  constructor(message) {
    super(`${message}`, 422);
  }
}

module.exports = ValidationError;

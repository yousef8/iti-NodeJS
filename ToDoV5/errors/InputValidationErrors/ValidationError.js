const MyError = require('../MyError');

class ValidationError extends MyError {
  constructor(message) {
    super(`${message}`, 400);
  }
}

module.exports = ValidationError;

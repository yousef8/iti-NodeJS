const ValidationError = require('./ValidationError');

class MissingRequiredFieldError extends ValidationError {
  constructor(message) {
    super(`Missing Required Field : ${message}`);
  }
}

module.exports = MissingRequiredFieldError;

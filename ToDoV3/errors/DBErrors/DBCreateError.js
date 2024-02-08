const DBInternalError = require('./DBInternalError');

class DBCreateError extends DBInternalError {
  constructor(message) {
    super(`Failed DB creation : ${message}`);
  }
}

module.exports = DBCreateError;

const MyError = require('../MyError');

class DBInternalError extends MyError {
  constructor(message) {
    super(`${message}`);
  }
}

module.exports = DBInternalError;

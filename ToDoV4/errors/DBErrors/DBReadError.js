const DBInternalError = require('./DBInternalError');

class DBReadError extends DBInternalError {
  constructor(message) {
    super(`Failed Read Operation From DB : ${message}`);
  }
}

module.exports = DBReadError;

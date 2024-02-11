const DBInternalError = require('./DBInternalError');

class DBWriteError extends DBInternalError {
  constructor(message) {
    super(`Failed Write Operation to DB : ${message}`);
  }
}

module.exports = DBWriteError;

const DBInternalError = require('./DBInternalError');

class DBRecordNotFoundError extends DBInternalError {
  constructor(message) {
    super(`Record Not Found In DB : ${message}`);
  }
}

module.exports = DBRecordNotFoundError;

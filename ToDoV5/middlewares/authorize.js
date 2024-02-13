const AuthorizationError = require('../errors/AuthorizationError');

function authorize(req, res, next) {
  if (req.params.id !== req.userId) {
    return next(new AuthorizationError());
  }
  return next();
}

module.exports = authorize;

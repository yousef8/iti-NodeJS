const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

async function authenticate(req, res, next) {
  const token = req.header('authorization');
  if (!token) return next(new AuthenticationError());

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.userId) {
      return next(new AuthenticationError());
    }

    req.userId = payload.userId;
    return next();
  } catch (error) {
    console.log('token is right');
    return next(new AuthenticationError());
  }
}

module.exports = authenticate;

const jwt = require('jsonwebtoken');
const MyError = require('../errors/MyError');

function authenticate(req, res, next) {
  const token = req.header('authorization');
  if (!token) return next(new MyError('Not Auhtorized', 401));
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    return next();
  } catch (error) {
    console.log('token is right');
    return next(new MyError('Not Auhtorized', 401));
  }
}

module.exports = authenticate;

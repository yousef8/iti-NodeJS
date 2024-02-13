const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const Todos = require('../models/todos');
const asyncWrapper = require('../lib/async-wrapper');
const MyError = require('../errors/MyError');
const MissingRequiredFieldError = require('../errors/InputValidationErrors/MissingRequiredFieldError');
const ValidationError = require('../errors/InputValidationErrors/ValidationError');
const AutenticationError = require('../errors/AuthenticationError');

async function register(req, res, next) {
  const {
    firstName, lastName, username, password,
  } = req.body;

  if (!(firstName && lastName && username && password)) {
    return next(new MissingRequiredFieldError('firstName lastName username password'));
  }

  const [err, user] = await asyncWrapper(Users.create({
    firstName, lastName, username, password,
  }));

  if (err) {
    return next(new MyError(err.message, 422));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return res.status(201).json({ user, token });
}

async function getUsers(req, res, next) {
  const [err, users] = await asyncWrapper(Users.find({ _id: req.userId }).exec());

  if (err) {
    return next(new MyError(err.message, 500));
  }

  return res.json(users);
}

async function deleteUser(req, res, next) {
  const [err, queryRes] = await asyncWrapper(Users.deleteOne({ _id: req.userId }).exec());
  if (err) {
    return next(new MyError(err.message, 400));
  }

  if (!queryRes.deletedCount) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);
}

async function editUser(req, res, next) {
  const {
    firstName, lastName, username, password,
  } = req.body;

  if (!(firstName || lastName || username || password)) {
    return next(new MissingRequiredFieldError('firstName lastName username password'));
  }

  const [err, user] = await asyncWrapper(Users.findOne({ _id: req.userId }).exec());

  if (err) {
    return next(new MyError(err.message, 500));
  }

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (username) user.username = username;
  if (password) user.password = password.toString();

  const [error, updatedUser] = await asyncWrapper(user.save());

  if (error) {
    return next(new MyError('Internal Error', 500));
  }

  return res.json(updatedUser);
}

async function getUserTodos(req, res, next) {
  const [err, todos] = await asyncWrapper(Todos.find({ userId: req.userId }).populate('userId'));

  if (err) {
    return next(new ValidationError(err.message));
  }

  return res.json(todos);
}

async function login(req, res, next) {
  const { username, password } = req.body;
  if (!(username && password)) {
    return next(new MissingRequiredFieldError('username && password'));
  }

  const user = await Users.findOne({ username }).exec();
  const valid = await user.verifyPassword(password);

  if (!valid) {
    return next(new AutenticationError());
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return res.json({ user, token });
}

module.exports = {
  register, getUsers, deleteUser, editUser, getUserTodos, login,
};

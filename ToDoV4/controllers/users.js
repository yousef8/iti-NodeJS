const Users = require('../models/users');
const asyncWrapper = require('../lib/async-wrapper');
const MyError = require('../errors/MyError');
const MissingRequiredFieldError = require('../errors/InputValidationErrors/MissingRequiredFieldError');

async function createUser(req, res, next) {
  const {
    firstName, lastName, username, password,
  } = req.body;

  if (!(firstName && lastName && username && password)) {
    return next(new MissingRequiredFieldError('Mandatory fields [firstName lastName username password] must exist and cannot be empty', 422));
  }

  const [err, user] = await asyncWrapper(Users.create({
    firstName, lastName, username, password,
  }));

  if (err) {
    return next(new MyError(err.message, 422));
  }

  return res.status(201).json(user);
}

async function getUsers(req, res, next) {
  const [err, users] = await asyncWrapper(Users.find({}, { id: true, firstName: true, _id: false }).exec());

  if (err) {
    return next(new MyError(err.message, 500));
  }

  return res.json(users);
}

async function deleteUser(req, res, next) {
  const [err, queryRes] = await asyncWrapper(Users.deleteOne({ id: req.params.id }).exec());
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
    return next(new MissingRequiredFieldError('At least One of these fields [firstName lastName username password] must exist and cannot be empty'));
  }

  const [err, queryRes] = await asyncWrapper(Users.findOneAndUpdate({ id: req.params.id }, {
    firstName, lastName, username, password,
  }, { returnDocument: 'after' }).select({ _id: false, __v: false }).exec());

  if (err) {
    return next(new MyError(err.message, 400));
  }

  return res.json(queryRes);
}
module.exports = {
  createUser, getUsers, deleteUser, editUser,
};

const Todos = require('../models/todos');
const asyncWrapper = require('../lib/async-wrapper');
const MyError = require('../errors/MyError');
const ValidationError = require('../errors/InputValidationErrors/ValidationError');
const MissingRequiredFieldError = require('../errors/InputValidationErrors/MissingRequiredFieldError');

exports.getTodos = async function getTodos(req, res) {
  const todos = await Todos.find({ userId: req.userId }).exec();
  res.json(todos);
};

exports.getTodo = async function getTodo(req, res) {
  try {
    const foundTodo = await Todos.findOne({ _id: req.params.id, userId: req.userId }).exec();
    if (!foundTodo) {
      res.status(404);
      res.end();
    }

    res.json(foundTodo);
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    res.status(500);
    res.end();
  }
};

exports.addTodo = async function addTodo(req, res, next) {
  const {
    title, status, tags,
  } = req.body;

  if (!title.trim()) {
    return next(new MissingRequiredFieldError('title cannot be missing or empty'));
  }

  const [err, todo] = await asyncWrapper(Todos.create({
    title, status, userId: req.userId, tags,
  }));

  if (err) {
    return next(new ValidationError(err.message));
  }
  return res.status(201).json(todo);
};

exports.editTodo = async function editTodo(req, res, next) {
  const { title, status, tags } = req.body;
  if (title && !title.trim()) {
    return next(new ValidationError('title cannot be empty'));
  }

  if (tags && !tags.trim()) {
    return next(new ValidationError('tags cannot be empty'));
  }

  const [err, todo] = await asyncWrapper(Todos.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, { title, status, tags }, { returnDocument: 'after' }));

  if (err) {
    return next(new ValidationError(err.message));
  }

  if (!todo) {
    return next(new MyError('Not Found', 404));
  }

  return res.json(todo);
};

exports.deleteTodo = async function deleteTodo(req, res) {
  try {
    console.log(req.userId, req.params.id);
    const deleteRes = await Todos.deleteOne({ _id: req.params.id, userId: req.userId });

    if (!deleteRes.deletedCount) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (err) {
    console.log(err.name);
    console.log(err.message);

    res.status(500);
    res.end();
  }
};

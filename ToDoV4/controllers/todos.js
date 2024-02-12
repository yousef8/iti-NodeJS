const Todos = require('../models/todos');
const asyncWrapper = require('../lib/async-wrapper');
const ValidationError = require('../errors/InputValidationErrors/ValidationError');
const MissingRequiredFieldError = require('../errors/InputValidationErrors/MissingRequiredFieldError');

exports.getTodos = async function getTodos(req, res) {
  const todos = await Todos.find({}).exec();
  res.json(todos);
};

exports.getTodo = async function getTodo(req, res) {
  try {
    const foundTodo = await Todos.findOne({ id: req.params.id }).exec();
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
    title, status, userId, tags,
  } = req.body;

  if (!title.trim()) {
    return next(new MissingRequiredFieldError('title cannot be missing or empty'));
  }

  const [err, todo] = await asyncWrapper(Todos.create({
    title, status, userId, tags,
  }));

  if (err) {
    return next(new ValidationError(err.message));
  }
  res.status(201);
  res.json(todo);
};

exports.editTodo = async function editTodo(req, res, next) {
  const { title, status, tags } = req.body;
  if (title && !title.trim()) {
    return next(new ValidationError('title cannot be empty'));
  }

  if (tags && !tags.trim()) {
    return next(new ValidationError('tags cannot be empty'));
  }

  const [err, todo] = await asyncWrapper(Todos.findOneAndUpdate({ _id: req.params.id }, { title, status, tags }, { returnDocument: 'after' }));

  if (err) {
    return next(new ValidationError(err.message));
  }

  return res.json(todo);
};

exports.deleteTodo = async function deleteTodo(req, res) {
  try {
    const deleteRes = await Todos.deleteOne({ id: req.params.id });
    if (!deleteRes.deletedCount) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (err) {
    console.log(err.name);
    console.log(err.message);

    res.status(500);
    res.end();
  }
};

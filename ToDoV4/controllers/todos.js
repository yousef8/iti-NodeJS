const Todos = require('../models/todos');
const DBRecordNotFoundError = require('../errors/DBErrors/DBRecordNotFoundError');

exports.getTodos = async function getTodos(req, res) {
  const todos = await Todos.find({}, { _id: 0, __v: 0 }).exec();
  res.json(todos);
};

exports.getTodo = async function getTodo(req, res) {
  try {
    const foundTodo = await Todos.findOne({ id: req.params.id }, { _id: 0, __v: 0 }).exec();
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

exports.addTodo = async function addTodo(req, res) {
  try {
    if (!req.body.title) {
      res.status(400);
      res.json({ msg: 'Title field is mandatory and cannot be empty' });
      return;
    }

    res.status(201);
    res.json(await Todos.create({ title: req.body.title }));
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    res.status(500);
    res.end();
  }
};

exports.editTodo = async function editTodo(req, res) {
  try {
    if (!req.body.title) {
      res.status(400);
      res.json({ msg: 'Title field is mandatory and cannot be empty' });
      return;
    }

    res.json(await Todos.findOneAndUpdate({ id: req.params.id }, { title: req.body.title }, { returnDocument: 'after' }).select({ _id: 0, __v: 0 }));
  } catch (err) {
    if (err instanceof DBRecordNotFoundError) {
      res.status(404);
      res.end();
      return;
    }

    console.log(err.name);
    console.log(err.message);
    res.status(500);
    res.end();
  }
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

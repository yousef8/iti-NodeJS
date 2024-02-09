const todosModel = require('../models/todoModel');
const DBRecordNotFoundError = require('../errors/DBErrors/DBRecordNotFoundError');

function isValidString(value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return false;
  }

  return true;
}

exports.getTodos = (req, res) => {
  res.json(todosModel.getTodos());
};

exports.getTodo = (req, res) => {
  try {
    res.json(todosModel.getTodo(req.params.id));
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

exports.addTodo = (req, res) => {
  try {
    if (!Object.hasOwn(req.body, 'text')) {
      res.status(400);
      res.json({ msg: 'Text field is mandatory' });
      return;
    }

    if (!isValidString(req.body.text)) {
      res.status(400);
      res.json({ msg: 'Text field cannot be empty' });
      return;
    }

    res.status(201);
    res.json(todosModel.addTodo(req.body.text));
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    res.status(500);
    res.end();
  }
};

exports.editTodo = (req, res) => {
  try {
    if (!Object.hasOwn(req.body, 'text')) {
      res.status(400);
      res.json({ msg: 'Text field is mandatory' });
      return;
    }

    if (!isValidString(req.body.text)) {
      res.status(400);
      res.json({ msg: 'Text field cannot be empty' });
      return;
    }

    res.status(201);
    res.json(todosModel.editToDo(req.params.id, req.body.text));
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

exports.deleteTodo = (req, res) => {
  try {
    res.json(todosModel.deleteTodo(req.params.id));
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

const DBRecordNotFoundError = require('../errors/DBErrors/DBRecordNotFoundError');
const DBWriteError = require('../errors/DBErrors/DBWriteError');
const { Todos } = require('../models/todoModel');

const todos = new Todos();

function isValidString(value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return false;
  }

  return true;
}

function isValidInt(arg) {
  const parsedArg = parseInt(arg, 10);
  if (Number.isNaN(parsedArg)) {
    return false;
  }
  return true;
}

function getTodos() {
  return todos.getTodos();
}

function getTodo(id) {
  if (!isValidInt(id)) {
    return undefined;
  }

  let foundTodo;
  try {
    foundTodo = todos.getTodo(parseInt(id, 10));
  } catch (err) {
    if (err instanceof DBRecordNotFoundError) {
      throw err;
    }
    console.log(err.name);
    console.log(err.message);
    process.exit(1);
  }

  return foundTodo;
}

function addTodo(text) {
  if (!isValidString(text)) {
    return undefined;
  }

  let addedTodo;
  try {
    addedTodo = todos.addTodo(text);
  } catch (err) {
    if (err instanceof DBWriteError) {
      throw err;
    }
    console.log(err.name);
    console.log(err.message);
    process.exit(1);
  }

  return addedTodo;
}

function editTodo(id, text) {
  if (isValidInt(id) && isValidString(text)) {
    return todos.editToDo(parseInt(id, 10), text);
  }

  return undefined;
}

function deleteTodo(id) {
  return todos.deleteTodo(parseInt(id, 10));
}

module.exports = {
  getTodo, getTodos, addTodo, editTodo, deleteTodo,
};

const model = require('../models/todoModel');

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
  return model.getTodos();
}

function getTodo(id) {
  if (isValidInt(id)) {
    return model.getTodo(parseInt(id, 10));
  }
  return undefined;
}

function addTodo(text) {
  if (isValidString(text)) {
    return model.addTodo(text);
  }

  return undefined;
}

function editTodo(id, text) {
  if (isValidInt(id) && isValidString(text)) {
    return model.editToDo(parseInt(id, 10), text);
  }

  return undefined;
}

function deleteTodo(id) {
  return model.deleteTodo(parseInt(id, 10));
}

module.exports = {
  getTodo, getTodos, addTodo, editTodo, deleteTodo,
};

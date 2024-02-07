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
  if (isValidInt(id)) {
    return todos.getTodo(parseInt(id, 10));
  }
  return undefined;
}

function addTodo(text) {
  if (isValidString(text)) {
    return todos.addTodo(text);
  }

  return undefined;
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

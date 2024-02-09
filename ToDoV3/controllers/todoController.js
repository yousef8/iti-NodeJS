const { Todos } = require('../models/todoModel');

const todos = new Todos();

function isValidString(value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return false;
  }

  return true;
}

function getTodos() {
  return todos.getTodos();
}

function getTodo(id) {
  return todos.getTodo(id);
}

function addTodo(text) {
  if (!isValidString(text)) {
    return undefined;
  }

  return todos.addTodo(text);
}

function editTodo(id, text) {
  if (!isValidString(text)) {
    return undefined;
  }
  return todos.editToDo(id, text);
}

function deleteTodo(id) {
  return todos.deleteTodo(id);
}

module.exports = {
  getTodo, getTodos, addTodo, editTodo, deleteTodo,
};

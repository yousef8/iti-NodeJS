const model = require('../models/todoModel');

function getTodos() {
  return model.getTodos();
}

function getTodo(id) {
  return model.getTodo(parseInt(id, 10));
}

function addTodo(text) {
  return model.addTodo(text);
}

function editTodo(id, text) {
  return model.editToDo(parseInt(id, 10), text);
}

function deleteTodo(id) {
  return model.deleteTodo(parseInt(id, 10));
}

module.exports = {
  getTodo, getTodos, addTodo, editTodo, deleteTodo,
};

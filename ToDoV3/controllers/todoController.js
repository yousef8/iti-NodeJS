const model = require('../models/todoModel');

function getTodos() {
  console.log('controller getTodos()');
  return model.getTodos();
}

function getTodo(id) {
  return model.getTodo(parseInt(id, 10));
}

function addTodo(text) {
  model.addTodo(text);
  return model.getTodos();
}

function editTodo(id, text) {
  model.editToDo(parseInt(id, 10), text);
  return getTodos();
}

function deleteTodo(id) {
  model.deleteTodo(parseInt(id, 10));
  return getTodos();
}

module.exports = {
  getTodo, getTodos, addTodo, editTodo, deleteTodo,
};

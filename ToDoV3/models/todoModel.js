const fs = require('fs');
const path = require('path');

const todosFileName = 'todos.json';

function Todo(id, text) {
  return {
    id,
    text,
  };
}

function getTodos() {
  const isTodosExist = fs.existsSync(path.join(__dirname, todosFileName));
  if (!isTodosExist) {
    console.log('file does not exist');
    fs.writeFileSync(path.join(__dirname, todosFileName), '[]');
  }

  return JSON.parse(fs.readFileSync(path.join(__dirname, todosFileName), 'utf-8'));
}

function generateId() {
  const todos = getTodos();
  if (todos.length < 1) {
    return 1;
  }
  return todos[todos.length - 1].id + 1;
}

function writeTodosToFile(newTodos) {
  fs.writeFileSync(path.join(__dirname, todosFileName), JSON.stringify(newTodos));
}

function getTodo(id) {
  const todos = getTodos();
  return todos.find((todo) => todo.id === id);
}

function addTodo(text) {
  const todos = getTodos();
  todos.push(new Todo(generateId(), text));
  writeTodosToFile(todos);
}

function editToDo(id, newTodoText) {
  const todos = getTodos();
  const foundTodo = todos.find((todo) => todo.id === id);

  if (!foundTodo) {
    console.log(`No todo with id [${id}] exists`);
    return;
  }

  foundTodo.text = newTodoText;
  writeTodosToFile(todos);
}

function deleteTodo(id) {
  let todos = getTodos();

  const foundTodo = todos.find((todo) => todo.id === id);
  if (!foundTodo) {
    console.log(`Todo with id ${id} doesn't exist`);
    return;
  }
  todos = todos.filter((todo) => todo.id !== id);
  writeTodosToFile(todos);
}

module.exports = {
  addTodo, editToDo, deleteTodo, getTodos, getTodo,
};
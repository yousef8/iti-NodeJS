const fs = require('fs');
const path = require('path');

const todosFileName = 'todos.json';

function Todo(id, text) {
  this.id = id;
  this.text = text;
}

function getTodos() {
  const isTodosExist = fs.existsSync(path.join(__dirname, todosFileName));
  if (!isTodosExist) {
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
  try {
    const todos = getTodos();
    const todo = new Todo(generateId(), text);
    todos.push(todo);
    writeTodosToFile(todos);
    return todo;
  } catch (err) {
    return undefined;
  }
}

function editToDo(id, newTodoText) {
  try {
    const todos = getTodos();
    const foundTodo = todos.find((todo) => todo.id === id);

    if (!foundTodo) {
      return undefined;
    }

    foundTodo.text = newTodoText;
    writeTodosToFile(todos);
    return foundTodo;
  } catch (err) {
    return undefined;
  }
}

function deleteTodo(id) {
  try {
    let todos = getTodos();
    const foundTodo = todos.find((todo) => todo.id === id);
    if (!foundTodo) {
      return undefined;
    }
    todos = todos.filter((todo) => todo.id !== id);
    writeTodosToFile(todos);
    return foundTodo;
  } catch (err) {
    return undefined;
  }
}

module.exports = {
  addTodo, editToDo, deleteTodo, getTodos, getTodo,
};

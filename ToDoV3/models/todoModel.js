const fs = require('fs');
const path = require('path');

class Todo {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

class Todos {
  #fileName;
  #filePath;
  #todos;
  #nextId;

  constructor() {
    this.#fileName = 'todos.json';
    this.#filePath = path.join(__dirname, this.#fileName);

    const isTodosExist = fs.existsSync(this.#filePath);
    if (!isTodosExist) {
      fs.writeFileSync(this.#filePath,  '[]');
    }

    this.#todos = JSON.parse(fs.readFileSync(this.#filePath, 'utf-8'));
    this.#nextId = this.#todos.length ? this.#todos.at(-1).id + 1 : 1;
  }

  #writeToFile() {
    fs.writeFileSync(this.#filePath, JSON.stringify(this.#todos));
  }

  #generateId(){
    return this.#nextId++;
  }

  getTodos() {
    return this.#todos;
  }

  getTodo(id) {
    return this.#todos.find((todo) => todo.id === id);
  }

  addTodo(text) {
    try {
      const todo = new Todo(this.#generateId(), text);
      this.#todos.push(todo);
      this.#writeToFile();
      return todo;
    } catch (err) {
      return undefined;
    }
  }

  editToDo(id, newTodoText) {
  try {
    const foundTodo = this.#todos.find((todo) => todo.id === id);

    if (!foundTodo) {
      return undefined;
    }

    foundTodo.text = newTodoText;
    this.#writeToFile();
    console.log(foundTodo);
    return foundTodo;
  } catch (err) {
    return undefined;
  }
}

deleteTodo(id) {
  try {
    const delTodo = this.#todos.find((todo) => todo.id === id)
    if(!delTodo){
      return undefined;
    }
    this.#todos = this.#todos.filter((todo) => todo.id !== id);
    this.#writeToFile();
    return delTodo;
  } catch (err) {
    return undefined;
  }
}
}


module.exports = { Todos };

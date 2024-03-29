const fs = require('fs');
const path = require('path');
const DBCreateError = require('../errors/DBErrors/DBCreateError');
const DBRecordNotFoundError = require('../errors/DBErrors/DBRecordNotFoundError');
const DBWriteError = require('../errors/DBErrors/DBWriteError');

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
    this.#todos = [];

    try{
    const isTodosExist = fs.existsSync(this.#filePath);
    if (!isTodosExist) {
      this.#writeToFile()
    }

    this.#todos = JSON.parse(fs.readFileSync(this.#filePath, 'utf-8'));
    }catch(err){
      console.log(err.name);
      console.log(err.message);
      console.log(err.stack);
      throw new DBCreateError();
    }

    this.#nextId = this.#todos.length ? this.#todos.at(-1).id + 1 : 1;
  }

  #writeToFile() {
    try{
    fs.writeFileSync(this.#filePath, JSON.stringify(this.#todos));
    } catch(err){
      console.log(err.name);
      console.log(err.message);
      console.log(err.stack);
      throw new DBWriteError()
    }
  }

  #generateId(){
    return this.#nextId++;
  }

  getTodos() {
    return this.#todos;
  }

  getTodo(id) {
    let foundTodo = this.#todos.find((todo) => todo.id === id);
    if(!foundTodo){
      throw new DBRecordNotFoundError(`couldn't find record with id [${id}]`);
    }

    return {...foundTodo};
  }

  addTodo(text) {
    const todo = new Todo(this.#generateId(), text);
    this.#todos.push(todo);

    try {
      this.#writeToFile();
    } catch (err) {
      this.#todos.pop();
      throw err;
    }

    return {...todo};
  }

  editToDo(id, newTodoText) {
    const foundTodo = this.#todos.find((todo) => todo.id === id);

    if (!foundTodo) {
      throw new DBRecordNotFoundError(`record with id [${id}]`);
    }

    let oldText = foundTodo.text;
    foundTodo.text = newTodoText;

    try{
    this.#writeToFile();
    }catch (err){
      foundTodo.text = oldText; // Restore old state
      throw err;
    }

    return {...foundTodo};
}

deleteTodo(id) {
  const delTodo = this.#todos.find((todo) => todo.id === id)

  if(!delTodo){
    throw new DBRecordNotFoundError(`couldn't find record with id [${id}]`);
  }
  this.#todos = this.#todos.filter((todo) => todo.id !== id);

  try{
  this.#writeToFile();
  }catch(err){
    this.#todos.push(delTodo);
    throw err;
  }

  return {...delTodo};
}
}


module.exports = new Todos();

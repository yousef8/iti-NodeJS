const fs = require('fs');
const path = require('path');
const todosFileName = 'todos.json';

function addTodo(text) {
    let todos = getTodos();
    todos.push({ id: generateId(), text: text });

    writeTodosToFile(todos);
}

function listTodos() {
    getTodos().forEach((todo) => {
        console.log(`[${todo.id}] ${todo.text}`);
    })
}

function editToDo(id, newTodoText) {
    let todos = getTodos();
    let foundTodo = todos.find((todo) => todo.id === id);

    if (!foundTodo) {
        console.log(`No todo with id [${id}] exists`);
        return;
    }

    foundTodo.text = newTodoText;
    writeTodosToFile(todos);
}

function deleteTodo(id) {
    let todos = getTodos();

    let foundTodo = todos.find((todo) => todo.id === id)
    if (!foundTodo) {
        console.log(`Todo with id ${id} doesn't exist`);
        return;
    }
    todos = todos.filter((todo) => todo.id !== id);
    writeTodosToFile(todos);
}

function generateId() {
    const todos = getTodos();
    if (todos.length < 1) {
        return 1;
    }
    return todos[todos.length - 1].id + 1;
}

function getTodos() {
    const isTodosExist = fs.existsSync(path.join(__dirname, todosFileName));
    if (!isTodosExist) {
        fs.writeFileSync(todosFileName, '[]');
    }

    return JSON.parse(fs.readFileSync(path.join(__dirname, todosFileName), 'utf-8'));
}

function writeTodosToFile(newTodos) {
    fs.writeFileSync(todosFileName, JSON.stringify(newTodos));
}

module.exports = { addTodo, listTodos, editToDo, deleteTodo };
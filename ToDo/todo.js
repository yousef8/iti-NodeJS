const fs = require('fs');
const path = require('path');
const todosFileName = 'todos.json';

if (process.argv.length < 3) {
    console.log("Invalid: todo command [options]");
    return;
}

const command = process.argv[2];

switch (command) {
    case "add":
        {
            if (process.argv.length > 4) {
                console.log("[add] command only take 1 argument [Todo text]");
                return;
            }
            const todoText = process.argv[3];
            if (todoText === undefined) {
                console.log("[add] command needs only 1 additional argument which is todo title");
                return;
            }

            if (!todoText.trim()) {
                console.log("todo cannot be empty");
                return;
            }
            addTodo(todoText);
            break;

        }
    case "list":
        {
            if (process.argv.length > 3) {
                console.log("[list] command doesn't take any arguments");
                return;
            }
            listTodos();
            break;
        }

    case "edit":
        {
            if (process.argv.length > 5) {
                console.log("[edit] command takes 2 arguments [id newText]");
                return;
            }
            let id = process.argv[3];
            let todoNewText = process.argv[4];
            if (id === undefined && todoNewText === undefined) {
                console.log("edit id newToDoText");
                return;
            }

            id = parseInt(id);
            if (Number.isNaN(id)) {
                console.log(`id argument must be a number`);
                return;
            }

            if (!todoNewText.trim()) {
                console.log("todo cannot be empty");
                return;
            }

            editToDo(id, todoNewText);
            break;
        }

    case "delete":
        {
            if (process.argv.length > 4) {
                console.log("[delete] command only takes 1 argument which is [id]")
                return;
            }
            let id = process.argv[3];
            if (id === undefined) {
                console.log("delete id");
                return;
            }
            id = parseInt(id);
            if (Number.isNaN(id)) {
                console.log(`id argument must be a number`);
                return;
            }
            deleteTodo(id);
            break;
        }

    default:
        console.log("Not Supported Command");
        break;
}

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

    if (foundTodo === undefined) {
        console.log(`No todo with id [${id}] exists`);
        return;
    }

    foundTodo.text = newTodoText;
    writeTodosToFile(todos);
}

function deleteTodo(id) {
    let todos = getTodos();

    let foundTodo = todos.find((todo) => todo.id === id)
    if (foundTodo === undefined) {
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

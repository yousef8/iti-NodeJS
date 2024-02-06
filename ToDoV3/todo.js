const commander = require('commander');
const {
  addTodo, listTodos, editToDo, deleteTodo,
} = require('./todoList');

const program = new commander.Command();

function parseArgAsString(value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    throw new commander.InvalidArgumentError('Todo Cannot be empty');
  }

  return trimmedValue;
}

function parseArgAsInt(arg) {
  const parsedArg = parseInt(arg, 10);
  if (Number.isNaN(parsedArg)) {
    throw new commander.InvalidArgumentError('Not a number.');
  }
  return parsedArg;
}

program.command('add')
  .description('Add ToDo item')
  .argument('<string>', 'Todo text to add', parseArgAsString)
  .action(addTodo);

program.command('list')
  .description('List ToDo list')
  .action(listTodos);

program.command('edit')
  .description('Edit a ToDo')
  .argument('<id>', 'ID of ToDo to edit', parseArgAsInt)
  .argument('<string>', 'Updated ToDo text', parseArgAsString)
  .action(editToDo);

program.command('delete')
  .description('Delete an existing ToDo')
  .argument('<id>', 'ID of ToDo to delete', parseArgAsInt)
  .action(deleteTodo);

program.parse();

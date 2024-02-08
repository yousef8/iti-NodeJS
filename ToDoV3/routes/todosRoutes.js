const router = require('express').Router();
const {
  addTodo, getTodos, getTodo, deleteTodo, editTodo,
} = require('../controllers/todoController');
const DBRecordNotFoundError = require('../errors/DBErrors/DBRecordNotFoundError');
const DBWriteError = require('../errors/DBErrors/DBWriteError');

router.get('/todos', (req, res) => {
  res.json(getTodos());
});

router.get('/todos/:id', (req, res) => {
  let foundTodo;
  try {
    foundTodo = getTodo(req.params.id);
  } catch (err) {
    if (err instanceof DBRecordNotFoundError) {
      res.status(404);
      res.end();
      return;
    }

    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
    process.exit(1);
  }

  if (!foundTodo) {
    res.status(400);
    res.end();
    return;
  }
  res.json(foundTodo);
});

router.post('/todos', (req, res) => {
  let addedTodo;
  try {
    addedTodo = addTodo(req.body.text);
  } catch (err) {
    if (err instanceof DBWriteError) {
      res.status(500);
      res.end();
      return;
    }

    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
    process.exit(1);
  }
  if (!addedTodo) {
    res.status(400);
    res.end();
    return;
  }

  res.status(201);
  res.json(addedTodo);
});

router.delete('/todos/:id', (req, res) => {
  const deletedTodo = deleteTodo(req.params.id);
  if (!deletedTodo) {
    res.status(404);
    res.end();
  }

  res.json(deletedTodo);
});

router.patch('/todos/:id', (req, res) => {
  const editedTodo = editTodo(req.params.id, req.body.text);

  if (!editedTodo) {
    res.status(404);
    res.end();
  }
  res.status(201);
  res.json(editedTodo);
});

router.get('/', (req, res) => {
  res.render('index', { todos: getTodos() });
});

module.exports = router;

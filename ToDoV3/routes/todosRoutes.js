const router = require('express').Router();
const {
  addTodo, getTodos, getTodo, deleteTodo, editTodo,
} = require('../controllers/todoController');
const DBRecordNotFoundError = require('../errors/DBErrors/DBRecordNotFoundError');

router.get('/todos', (req, res) => {
  res.json(getTodos());
});

router.get('/todos/:id', (req, res) => {
  try {
    const foundTodo = getTodo(req.params.id);
    if (!foundTodo) {
      res.status(400);
      res.end();
      return;
    }
    res.json(foundTodo);
  } catch (err) {
    if (err instanceof DBRecordNotFoundError) {
      res.status(404);
      res.end();
      return;
    }

    console.log(err.name);
    console.log(err.message);
    res.status(500);
    res.end();
  }
});

router.post('/todos', (req, res) => {
  try {
    const addedTodo = addTodo(req.body.text);

    if (!addedTodo) {
      res.status(400);
      res.end();
      return;
    }

    res.status(201);
    res.json(addedTodo);
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    res.status(500);
    res.end();
  }
});

router.delete('/todos/:id', (req, res) => {
  try {
    const deletedTodo = deleteTodo(req.params.id);
    if (!deletedTodo) {
      res.status(400);
      res.end();
      return;
    }

    res.json(deletedTodo);
  } catch (err) {
    if (err instanceof DBRecordNotFoundError) {
      res.status(404);
      res.end();
      return;
    }
    console.log(err.name);
    console.log(err.message);

    res.status(500);
    res.end();
  }
});

router.patch('/todos/:id', (req, res) => {
  try {
    const editedTodo = editTodo(req.params.id, req.body.text);

    if (!editedTodo) {
      res.status(400);
      res.end();
      return;
    }

    res.status(201);
    res.json(editedTodo);
  } catch (err) {
    if (err instanceof DBRecordNotFoundError) {
      res.status(404);
      res.end();
      return;
    }

    console.log(err.name);
    console.log(err.message);
    res.status(500);
    res.end();
  }
});

router.get('/', (req, res) => {
  res.render('index', { todos: getTodos() });
});

module.exports = router;

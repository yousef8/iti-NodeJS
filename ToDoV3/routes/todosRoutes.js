const router = require('express').Router();
const {
  addTodo, getTodos, getTodo, deleteTodo, editTodo,
} = require('../controllers/todoController');

router.get('/todos', (req, res) => {
  res.json(getTodos());
});

router.get('/todos/:id', (req, res) => {
  res.json(getTodo(req.params.id));
});

router.post('/todos', (req, res) => {
  const addedTodo = addTodo(req.body.text);
  if (!addedTodo) {
    res.status(400);
    res.end();
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

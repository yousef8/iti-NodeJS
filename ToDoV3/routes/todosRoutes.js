const router = require('express').Router();
const {
  addTodo, getTodos, getTodo, deleteTodo, editToDo,
} = require('../todoList');

router.get('/todos', (req, res) => {
  const todos = getTodos();
  res.json(todos);
});

router.get('/todos/:id', (req, res) => {
  res.json(getTodo(parseInt(req.params.id, 10)));
});

router.post('/todos', (req, res) => {
  addTodo(req.body.text);
  res.json(getTodos());
});

router.delete('/todos/:id', (req, res) => {
  deleteTodo(parseInt(req.params.id, 10));
  res.json(getTodos());
});

router.patch('/todos/:id', (req, res) => {
  editToDo(parseInt(req.params.id, 10), req.body.text);
  res.json(getTodos());
});

module.exports = router;

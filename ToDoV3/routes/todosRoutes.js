const router = require('express').Router();
const {
  addTodo, getTodos, getTodo, deleteTodo, editToDo,
} = require('../controllers/todoController');

router.get('/todos', (req, res) => {
  res.json(getTodos());
});

router.get('/todos/:id', (req, res) => {
  res.json(getTodo(req.params.id));
});

router.post('/todos', (req, res) => {
  res.json(addTodo(req.body.text));
});

router.delete('/todos/:id', (req, res) => {
  res.json(deleteTodo(req.params.id));
});

router.patch('/todos/:id', (req, res) => {
  res.json(editToDo(req.params.id, req.body.text));
});

module.exports = router;

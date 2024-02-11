const router = require('express').Router();
const todosCtrler = require('../controllers/todos');
const { parseId } = require('../middlewares/middlewares');

router.get('/todos', todosCtrler.getTodos);

router.get('/todos/:id', parseId, todosCtrler.getTodo);

router.post('/todos', todosCtrler.addTodo);

router.patch('/todos/:id', parseId, todosCtrler.editTodo);

router.delete('/todos/:id', parseId, todosCtrler.deleteTodo);

module.exports = router;

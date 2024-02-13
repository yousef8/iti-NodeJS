const router = require('express').Router();
const todosCtrler = require('../controllers/todos');
const authenticate = require('../middlewares/authenticate');
const parseId = require('../middlewares/parseId');

router.get('/todos', authenticate, todosCtrler.getTodos);

router.get('/todos/:id', authenticate, parseId, todosCtrler.getTodo);

router.post('/todos', authenticate, todosCtrler.addTodo);

router.patch('/todos/:id', authenticate, parseId, todosCtrler.editTodo);

router.delete('/todos/:id', authenticate, parseId, todosCtrler.deleteTodo);

module.exports = router;

const router = require('express').Router();
const todosCtrler = require('../controllers/todos');
const getUserFromToken = require('../middlewares/getUserFromToken');
const parseId = require('../middlewares/parseId');

router.get('/todos', getUserFromToken, todosCtrler.getTodos);

router.get('/todos/:id', getUserFromToken, parseId, todosCtrler.getTodo);

router.post('/todos', getUserFromToken, todosCtrler.addTodo);

router.patch('/todos/:id', getUserFromToken, parseId, todosCtrler.editTodo);

router.delete('/todos/:id', getUserFromToken, parseId, todosCtrler.deleteTodo);

module.exports = router;

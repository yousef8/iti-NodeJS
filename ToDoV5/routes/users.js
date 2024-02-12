const router = require('express').Router();
const usersCtrler = require('../controllers/users');
const parseId = require('../middlewares/parseId');
const getUserFromToken = require('../middlewares/getUserFromToken');

router.get('/users', getUserFromToken, usersCtrler.getUsers);

router.post('/users/login', usersCtrler.login);

router.get('/users/:id/todos', getUserFromToken, parseId, usersCtrler.getUserTodos);

router.post('/users', usersCtrler.register);

router.patch('/users/:id', getUserFromToken, parseId, usersCtrler.editUser);

router.delete('/users/:id', getUserFromToken, parseId, usersCtrler.deleteUser);

module.exports = router;

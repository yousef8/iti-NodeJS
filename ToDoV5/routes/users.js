const router = require('express').Router();
const usersCtrler = require('../controllers/users');
const parseId = require('../middlewares/parseId');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/users', authenticate, usersCtrler.getUsers);

router.post('/users/login', usersCtrler.login);

router.get('/users/:id/todos', authenticate, parseId, authorize, usersCtrler.getUserTodos);

router.post('/users', usersCtrler.register);

router.patch('/users/:id', authenticate, parseId, authorize, usersCtrler.editUser);

router.delete('/users/:id', authenticate, parseId, authorize, usersCtrler.deleteUser);

module.exports = router;

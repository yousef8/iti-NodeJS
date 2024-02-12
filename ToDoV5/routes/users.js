const router = require('express').Router();
const usersCtrler = require('../controllers/users');
const parseId = require('../middlewares/parseId');

router.get('/users', usersCtrler.getUsers);

router.post('/users/login', usersCtrler.login);

router.get('/users/:id/todos', usersCtrler.getTodos);

router.post('/users', usersCtrler.createUser);

router.patch('/users/:id', parseId, usersCtrler.editUser);

router.delete('/users/:id', parseId, usersCtrler.deleteUser);

module.exports = router;

const Todos = require('../models/todos');

exports.getHomePage = (req, res) => {
  res.render('index', { todos: Todos.find({}, { _id: 0, __v: 0 }) });
};

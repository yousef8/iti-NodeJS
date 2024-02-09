const todosModel = require('../models/todoModel');

exports.getHomePage = (req, res) => {
  res.render('index', { todos: todosModel.getTodos() });
};

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const viewsRouter = require('./routes/views');

mongoose.connect('mongodb://127.0.0.1:27017/TodoApp');

const app = express();
const port = process.env.PORT || 4200;

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(todosRouter);
app.use(viewsRouter);
app.use(usersRouter);

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

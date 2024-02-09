const express = require('express');
const todosRouter = require('./routes/todos');
const viewsRouter = require('./routes/views');

const app = express();
const port = process.env.PORT || 4200;

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(todosRouter);

app.use(viewsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

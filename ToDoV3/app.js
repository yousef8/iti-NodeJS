const express = require('express');
const router = require('./routes/todosRoutes');

const app = express();
const port = process.env.PORT || 4200;

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

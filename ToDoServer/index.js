const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('content-type', 'text/html');

    if (!fs.existsSync(path.join(__dirname, 'todos.json'))) {
      res.write('<body><h1>Empty ToDo List</h1></body>');
      return res.end();
    }

    const todosStream = fs.createReadStream(path.join(__dirname, 'todos.json'), 'utf-8');
    const styleStream = fs.createReadStream(path.join(__dirname, 'style.css'), 'utf-8');

    let todos = '';
    todosStream.on('data', (chunk) => {
      todos += chunk;
    });

    let style = '';
    styleStream.on('data', (chunk) => {
      style += chunk;
    });

    return todosStream.on('end', () => {
      res.write('<body> <ul>');
      todos = JSON.parse(todos);
      todos.forEach((todo) => {
        res.write(`<li>${todo.text}</li>`);
      });
      res.write('</ul>');
      return styleStream.on('end', () => {
        res.write(`<style>${style}</style></body>`);
        return res.end();
      });
    });
  }

  if (req.url === '/astronomy' && req.method === 'GET') {
    const imgSrc = 'https://media.cnn.com/api/v1/images/stellar/prod/200505225212-04-fossils-and-climate-change-museum.jpg?q=x_0,y_0,h_1125,w_1999,c_fill/h_720,w_1280';
    res.setHeader('content-type', 'text/html');
    res.write(`<body><div><img src="${imgSrc}"></div></body>`);
    res.write('<p>Wati El Hitan, known as the Valley of Whales, is home to the unique Fossils and Climate Change Museum</p>');
    return res.end();
  }

  res.write('<h1>404 : Page Not Found</h1>');
  return res.end();
});

server.listen(3000);

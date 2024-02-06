const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/style.css') {
    res.setHeader('content-type', 'text/css');
    const styleStream = fs.createReadStream(path.join(__dirname, 'style.css'), 'utf-8');
    styleStream.pipe(res);
    return styleStream.on('end', () => res.end());
  }

  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('content-type', 'text/html');

    if (!fs.existsSync(path.join(__dirname, 'todos.json'))) {
      res.write('<body><h1>Empty ToDo List</h1></body>');
      return res.end();
    }
    res.write('<!DOCTYPE html>');
    res.write('<head><link rel="stylesheet" href="/style.css" type="text/css"></head>');

    const todosStream = fs.createReadStream(path.join(__dirname, 'todos.json'), 'utf-8');

    let todos = '';
    todosStream.on('data', (chunk) => {
      todos += chunk;
    });

    return todosStream.on('end', () => {
      res.write('<body> <ul>');
      todos = JSON.parse(todos);
      todos.forEach((todo) => {
        res.write(`<li>${todo.text}</li>`);
      });
      res.write('</ul>');
      return res.end();
    });
  }

  if (req.url === '/astronomy' && req.method === 'GET') {
    res.setHeader('content-type', 'text/html');
    res.write('<body><div><img src="/hitanValley.jpg"></div></body>');
    res.write('<p>Wati El Hitan, known as the Valley of Whales, is home to the unique Fossils and Climate Change Museum</p>');
    return res.end();
  }

  if (req.url === '/hitanValley.jpg' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    const imgStream = fs.readFileSync(path.join(__dirname, 'assets', 'hitanValley.jpg'));
    res.write(imgStream);
  }

  res.write('<h1>404 : Page Not Found</h1>');
  return res.end();
});

server.listen(3000);

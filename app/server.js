/**
*
* app/main.styl
* The entry point of your javascript application.
*
**/

import http from 'http';

import Hello from './components/Hello';

const h = new Hello();
h.sayHello();


http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

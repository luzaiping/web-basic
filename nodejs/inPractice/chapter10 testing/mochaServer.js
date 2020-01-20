const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/square/)) {
    const params = req.url.split('/');
    let number;
    if (params.length > 1 && params[2]) {
      number = parseInt(params[2], 10);
      res.writeHead(200);
      res.end((number * number).toString());
    } else {
      res.writeHead(500);
      res.end('Invalid input');
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8000);

module.exports = server;

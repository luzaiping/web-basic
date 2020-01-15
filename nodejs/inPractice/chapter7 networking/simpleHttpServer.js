const assert = require('assert');
const http = require('http');

const message = 'Hello, world.';
const port = 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write(message);
  res.end();
});

server.listen(port, () => {
  console.log('Listening on port', port);
});

const request = http.request({ port }, response => {
  const { headers, statusCode } = response;
  console.log('Http headers:', headers);
  response.on('data', data => {
    const receviedData = data.toString();
    console.log('Body:', receviedData);
    assert.equal(message, receviedData);
    assert.equal(200, statusCode);
    server.unref();
  });
});

request.end();

const assert = require('assert');
const http = require('http');

const message = 'Hello, world.';
const port = 8000;

// http 其实是 tcp socket，只是接收到请求，服务端返回response后会将 socket 关闭(也就是将connect断掉)
// the underlying socket will be closed as soon as the response has been written.
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

// http.request will create new connection
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

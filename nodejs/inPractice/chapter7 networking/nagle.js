const net = require('net');

const server = net.createServer(client => {
  client.setNoDelay(true); // 1. turn off nagle's algorithm
  client.write('377375042377373001', 'binary'); // 2. force client to use character mode.
  console.log('Server connected');

  client.on('end', () => {
    console.log('\r\nServer disconnected.');
    server.unref(); // 3. call unref() so that when last client disconnects, program exits.
  });

  client.on('data', data => {
    process.stdout.write(data.toString()); // 4. print out characters from client to the server's terminal
    // client.write(data.toString()); // 将收到的信息直接返回给 client
  });

  // 直接将 socket 的 readstream 和 writestram pipe 起来
  // 即将收到的数据直接返回给client
  client.pipe(client);
});

server.listen(8000, () => {
  console.log('Server bound on 8000');
});

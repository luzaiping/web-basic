const net = require('net');

const server = net.createServer(client => {
  client.setNoDelay(true); // 1. turn off nagle's algorithm
  client.write('377375042377373001', 'binary'); // 2. force client to use character mode.
  console.log('Server connected');
  client.on('end', () => {
    console.log('Server disconnected.');
    server.unref(); // 3. call unref() so that when last client disconnects, program exits.
  });
  client.on('data', data => {
    process.stdout.write(data.toString()); // 4. print out characters from client to the server's terminal
    client.write(data.toString);
  });
});

server.listen(8080, () => {
  console.log('Server bound');
});

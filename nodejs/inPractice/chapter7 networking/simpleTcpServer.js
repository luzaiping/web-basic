const net = require('net');
const assert = require('assert');

let clients = 0;
let expectedAssertions = 2;

const buildData = id => `Welcome client: ${id}\r\n`;

// client 参数是一个 net.Socket instance
const server = net.createServer(client => {
  clients++;

  const clientId = clients;
  console.log('Client connectd:', clientId);

  client.on('end', () => {
    console.log('Client disconnected:', clientId);
  });

  client.write(buildData(clientId));
  client.pipe(client);
});

server.listen(8080, () => {
  console.log('Server started on port 8080');

  runTest(1, () => {
    runTest(2, () => {
      console.log('Tests finished');
      assert.equal(0, expectedAssertions);
      server.close();
    });
  });
});

function runTest(expectedId, done) {
  // 这边的 client 也是 net.Socket 对象
  const client = net.connect(8080, () => {
    console.log('client connect successfully.');
  });

  client.on('data', data => {
    const exptectedData = buildData(expectedId);
    assert.equal(data.toString(), exptectedData);
    expectedAssertions--;
    client.end();
  });

  client.on('end', done);
}

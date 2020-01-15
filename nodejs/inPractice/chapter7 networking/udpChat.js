// const assert = require('assert');
const dgram = require('dgram');
// const fs = require('fs');

// const defaultSize = 16;
const port = 43210;
const socketType = 'udp4';

function Client(remoteIp) {
  const socket = dgram.createSocket(socketType);
  const readline = require('readline');
  const readlineInstance = readline.createInterface(
    process.stdin,
    process.stdout
  );

  socket.send(Buffer.from('<Join>'), 0, 6, port, remoteIp);

  readlineInstance.setPrompt('Message> ');
  readlineInstance.prompt();

  readlineInstance
    .on('line', line => {
      sendData(line);
    })
    .on('close', () => {
      process.exit(0);
    });

  socket.on('message', (msg, rinfo) => {
    console.log('\n<' + rinfo.address + '>', msg.toString());
    readlineInstance.prompt();
  });

  function sendData(message) {
    socket.send(Buffer.from(message), 0, message.length, port, remoteIp, () => {
      console.log('Send: ', message);
      readlineInstance.prompt();
    });
  }
}

function Server() {
  const clients = {};
  const server = dgram.createSocket(socketType);

  server.on('message', (msg, rinfo) => {
    const clientId = rinfo.address + ':' + rinfo.port;
    const msgStr = msg.toString();

    if (!clientId[clientId]) {
      clients[clientId] = rinfo;
    }

    // receive join message
    if (msgStr.match(/^</)) {
      console.log('Control message:', msgStr);
      return;
    }

    for (const itemId in clients) {
      if (itemId !== clientId) {
        const client = clients[itemId];
        server.send(
          Buffer.from(msgStr),
          0,
          msgStr.length,
          client.port,
          client.address,
          (err, bytes) => {
            if (err) console.error(err);
            console.log('Bytes send:', bytes);
          }
        );
      }
    }
  });

  server.on('listening', () => {
    console.log('Server is ready to conntect:', server.address());
  });

  server.bind(port);
}

if (!module.parent) {
  switch (process.argv[2]) {
    case 'client':
      new Client(process.argv[3]);
      break;
    case 'server':
      new Server();
      break;
    default:
      console.log('Unkown option');
  }
}

module.exports = {
  Client,
  Server
};

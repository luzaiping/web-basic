const dgram = require('dgram');
const fs = require('fs');

const port = 43210;
const defaultSize = 16;
const socketType = 'udp4';

function Client(remoteIp) {
  const readStream = fs.createReadStream(__filename);
  const socket = dgram.createSocket(socketType);

  const sendData = () => {
    const message = readStream.read(defaultSize);
    if (!message) {
      return socket.unref(); // call unref() to cause the program to exit
    }
    console.log(message.toString());

    socket.send(message, 0, message.length, port, remoteIp, sendData);
  };
  readStream.on('readable', () => {
    sendData();
  });
}

function Server() {
  const socket = dgram.createSocket(socketType);

  socket.on('message', msg => {
    process.stdout.write(msg.toString());
  });

  socket.on('listening', () => {
    console.log('Server is reday to accept connections:', socket.address());
  });

  socket.bind(port);
}

const [, , type, remoteIp] = process.argv;

if (type === 'client') {
  new Client(remoteIp);
} else {
  new Server();
}

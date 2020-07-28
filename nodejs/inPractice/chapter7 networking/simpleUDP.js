const dgram = require('dgram');
const fs = require('fs');

const socketType = 'udp4';
const DEFAULT_SIZE = 16;
const PORT = 4000;

function runServer() {
  const server = dgram.createSocket(socketType);
  server.bind(PORT, () => {
    console.log(`UDP server is bound to ${PORT}`);
  });

  server.on('message', msg => {
    // const { address, family, port } = rinfo;
    // console.log(`message is from ${address}:${port} with family ${family}`);
    process.stdout.write(msg.toString()); // process.stdout.write 不会自动添加 newlines；而 console.log 会
  });
}

function runClient() {
  const client = dgram.createSocket(socketType);

  const readStream = fs.createReadStream(__filename);

  function sendData() {
    const message = readStream.read(DEFAULT_SIZE); // 这边读取指定大小的数据，确保发送时数据不会太大，不然可能被 UDP 丢失掉

    if (message) {
      client.send(message, 0, message.length, PORT, error => {
        if (error) throw error;
        sendData(); // 这边需要递归调用 sendData, 这样才能持续读取数据
      });
    } else {
      // client.disconnect();
      client.unref();
    }
  }

  readStream.on('readable', sendData);

  client.on('error', error => {
    console.error(`something wrong with ${error.message}`);
  });
}

const [, , type] = process.argv;

type === 'client' ? runClient() : runServer();

/**
 * 一个基于 udp 的 简易 chat 例子
 */

const dgram = require('dgram');
const readline = require('readline');

const socketType = 'udp4';
const PORT = 4000;
let isServerRunning = false;

/**
 * 开启一个 upd client 并发送 'JOIN' 消息
 * 之后进入 prompt 模式 提示用户输入 message，一旦输入完 message 后就将 message 发送给 server
 * 同时监听 server 发送过来的 message，打印消息来源及内容，并再次进入 prompt 模式
 * @param {String} remoteIp
 */
function startClient(remoteIp = 'localhost') {
  const clientSocket = dgram.createSocket(socketType);

  const rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt('Message>');

  const sendData = msg => {
    const buffer = Buffer.from(msg);
    clientSocket.send(buffer, 0, buffer.byteLength, PORT, remoteIp, () => {
      console.log(`Sent: ${msg}`);
      rl.prompt();
    });
  };

  sendData('<JOIN>');

  rl.on('line', msg => {
    sendData(msg);
  }).on('close', () => {
    process.exit(0);
  });

  clientSocket.on('message', (msg, rinfo) => {
    console.log(`\n< ${rinfo.address}, ${msg}`);
    rl.prompt();
  });

  clientSocket.on('error', () => {
    clientSocket.disconnect();
  });
}

// 这个 server 有个致命的问题，client 断开了， server 并不知道
function startServer() {
  const server = dgram.createSocket(socketType);

  const clients = {}; // 存储 client 信息

  server.bind(PORT);

  server.on('listening', () => {
    isServerRunning = true;
    console.log('server ready:', server.address());
  });

  server.on('message', (buffer, rinfo) => {
    const msg = buffer.toString();
    const { address, port } = rinfo;
    const currentClientId = `${address}:${port}`;

    if (!clients[currentClientId]) {
      clients[currentClientId] = rinfo;
    }

    if (msg.match(/^</)) {
      console.log(`${currentClientId} ${msg}`);
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const clientId of Object.keys(clients)) {
        if (clientId !== currentClientId) {
          const {
            address: destinationAddress,
            port: destinationPort
          } = clients[clientId];

          server.send(
            buffer,
            0,
            buffer.byteLength,
            destinationPort,
            destinationAddress,
            (err, bytes) => {
              err ? console.error(err) : console.log(`Bytes send: ${bytes}`);
            }
          );
        }
      }
    }
  });
}

const [, , type, remoteIp] = process.argv;

switch (type) {
  case 'client':
    startClient(remoteIp);
    break;
  default:
    !isServerRunning && startServer();
    break;
}

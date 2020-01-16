const fs = require('fs');
const os = require('os');
const tls = require('tls');

const options = {
  key: fs.readFileSync('client.pem'), // load private key
  cert: fs.readFileSync('client-cert.pem'), // load public key
  ca: [fs.readFileSync('server-cert.pem')], // treat server as a certificate authority
  servername: os.hostname() // 这个值要跟 openssl csr 命令中输入的 common name 一致才行
};

const clearTextStream = tls.connect(8000, options, () => {
  const authorized = clearTextStream.authorized ? 'authorized' : 'unauthorized';
  console.log('Connected: ', authorized);
  process.stdin.pipe(clearTextStream); // read data from server and print it out.
});

clearTextStream.setEncoding('utf8');

clearTextStream.on('data', data => {
  console.log(data);
});

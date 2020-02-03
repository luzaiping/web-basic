const fs = require('fs');
const tls = require('tls');

const options = {
  key: fs.readFileSync('server.pem'), // private key
  cert: fs.readFileSync('server-cert.pem'), // public key
  // client public key as CA (这边是测试用，实际应该交给商业 CA 进行认证)
  // when using a commercially obtained certificate, this stage isn’t usually required. ***
  // this is required for self-signed cert.
  ca: [fs.readFileSync('client-cert.pem')],
  requestCert: true // set client authorization is forced.
};

// tls.createServer will call net.Server
const server = tls.createServer(options, clearTextStream => {
  const authorized = clearTextStream.authorized ? 'authorized' : 'unauthorized';

  console.log('Connected: ', authorized);
  clearTextStream.write('Welcome!\n');
  clearTextStream.setEncoding('utf8');
  clearTextStream.pipe(clearTextStream);
});

server.listen(8000, () => {
  console.log('Server listening');
});

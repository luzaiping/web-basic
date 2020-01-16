const fs = require('fs');
const https = require('https');

// when making HTTPS requests agaginst public web servers
// Node will be able to verify the server's certificates for you.
// so you don't need to set the key, cert,and ca options
const options = {
  key: fs.readFileSync('server.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  ca: [fs.readFileSync('client-cert.pem')],
  requestCert: true
};

const server = https.createServer(options, (req, res) => {
  const authorized = req.socket.authorized ? 'authorized' : 'unauthorized';
  res.writeHead(200);
  res.write(`Welcome! You are ${authorized} \n`);
});

server.listen(8000, () => {
  console.log('Https Server is listening');
});

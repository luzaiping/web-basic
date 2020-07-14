const http = require('http');
const fs = require('fs');
const { pipeline } = require('stream');
const { createBrotliDecompress, createInflate, createGunzip } = require('zlib');

const request = http.get({
  host: 'localhost',
  path: '/',
  port: 1337,
  headers: { 'Accept-Encoding': 'br, gzip, deflate' }
});

request.on('response', response => {
  const writer = fs.createWriteStream('index_client.html');

  const onError = err => {
    if (err) {
      console.error('发生错误：', err);
      process.exitCode = 1;
    }
  };

  const contentEncoding = response.headers['content-encoding'];
  let decompressor;

  switch (contentEncoding) {
    case 'br':
      decompressor = createBrotliDecompress();
      break;
    case 'gzip':
      decompressor = createGunzip();
      break;
    case 'deflate':
      decompressor = createInflate();
      break;
    default:
      break;
  }

  decompressor
    ? pipeline(response, decompressor, writer, onError)
    : pipeline(response, writer, onError);
});

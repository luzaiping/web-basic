const http = require('http');
const { createBrotliCompress, createGzip, createDeflate } = require('zlib');
const { pipeline } = require('stream');
const fs = require('fs');

http
  .createServer((request, response) => {
    const reader = fs.createReadStream('index.html');
    const acceptEncoding = request.headers['accept-encoding'] || '';

    const onError = err => {
      if (err) {
        response.end();
        console.error('发生错误:', err);
      }
    };

    let compressor;
    let contentEncoding;

    if (/\bdeflate\b/.test(acceptEncoding)) {
      compressor = createDeflate();
      contentEncoding = 'deflate';
    } else if (/\bgzip\b/.test(acceptEncoding)) {
      compressor = createGzip();
      contentEncoding = 'gzip';
    } else if (/\bbr\b/.test(acceptEncoding)) {
      compressor = createBrotliCompress();
      contentEncoding = 'br';
    }

    const responseHeader = !contentEncoding
      ? {}
      : { 'Content-Encoding': contentEncoding };

    response.setHeader('Vary', 'Accept-Encoding');
    response.writeHead(200, responseHeader);

    compressor
      ? pipeline(reader, compressor, response, onError)
      : pipeline(reader, response, onError);
  })
  .listen(1337, () => {
    console.log('server is running on 1337');
  });

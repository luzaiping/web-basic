/* eslint-disable no-unused-vars */
/**
 * Use fs.createReadStream to open a file and stream it to the client.
 */
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const INDEX_FILE_PATH = __dirname + '/index.html';

const withoutStreamable = () => {
  http.createServer((req, res) => {
    // fs.readFile will load entire file into memory, this is not efficient.
    fs.readFile(INDEX_FILE_PATH, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(String(err));
      } else {
        res.end(data);
      }
    });
  }).listen(8000);
  console.log('server start with port 8000');
};
// withoutStreamable();

// using createReadStream, read chunk of data at a time, is more efficient.
const withSteamable = () => {
  http.createServer((req, res) => {
    fs.createReadStream(INDEX_FILE_PATH).pipe(res);
  }).listen(8000);
};
// withSteamable();

// stream can pipe
// readable.pipe(writable)
const withGzipWebServer = () => {
  http.createServer((req, res) => {
    res.setHeader(200, { 'content-encoding': 'gzip' }); // set the header so the browser knows gzip compression has been used.
    fs.createReadStream(INDEX_FILE_PATH)
      .pipe(zlib.createGzip())
      .pipe(res);
  }).listen(8000);
};
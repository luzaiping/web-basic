/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const stream = require('stream');
const util = require('util');
const express = require('express');

const app = express();

function StatStream(limit) {
  stream.Readable.call(this);
  this.limit = limit;
}

StatStream.prototype._read = function(size) {
  // _read method must be implemented whenever U want to make a readable stream.
  if (this.limit === 0) {
    this.push();
  } else {
    this.push(util.inspect(process.memoryUsage()));
    this.push('n');
    this.limit--;
  }
};

util.inherits(StatStream, stream.Readable);

app.get('/', (req, res) => {
  const statStream = new StatStream(10);
  statStream.pipe(res); // using standard Readable.pipe(Writable) pattern to send data to the browser.
});

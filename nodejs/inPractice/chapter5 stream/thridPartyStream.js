/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const { Readable } = require('stream');
const util = require('util');
const express = require('express');

const app = express();

class StatStream extends Readable {
  constructor(limit) {
    super();
    this.limit = limit;
  }

  _read(size) {
    if (this.limit === 0) {
      this.push(null);
    } else {
      this.push(util.inspect(process.memoryUsage()));
      this.push('\n');
      this.limit--;
    }
  }
}

// util.inherits(StatStream, stream.Readable);

app.get('/', (req, res) => {
  const statStream = new StatStream(10);
  statStream.pipe(res); // using standard Readable.pipe(Writable) pattern to send data to the browser.
});

app.listen(8000, () => {
  console.log('server is runing on 8000');
});

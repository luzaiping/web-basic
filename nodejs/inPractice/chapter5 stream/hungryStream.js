/* eslint-disable no-underscore-dangle */
const { Duplex } = require('stream');

class HungryStream extends Duplex {
  constructor(options) {
    super(options);
    this.waiting = false; // this property tracks if the prompt is being displayed.
  }

  _write(chunk, encoding, callback) {
    this.waiting = false;
    this.push(`u001b[32m${chunk.toString()}u001b[39m\n`); // pushed data onto the internal queue
    callback();
  }

  _read() {
    if (!this.waiting) {
      this.push('Feed me data! >'); // Display a prompt when waiting for data.
      this.waiting = true;
    }
  }
}

const hungryStream = new HungryStream();
process.stdin.pipe(hungryStream).pipe(process.stdout);

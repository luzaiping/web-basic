/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { Writable } = require('stream');

class GreenStream extends Writable {
  _write(chunk, encoding, callback) {
    process.stdout.write(`u001b[32m${chunk.toString()}u001b[39m`);
    callback();
  }
}

process.stdin.pipe(new GreenStream());

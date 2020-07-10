/**
 * 实现一个 Writable 类，关键是完成 _write 方法
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { Writable } = require('stream');
const fs = require('fs');
// const path = require('path');
// const mkdirp = require('mkdirp');

class ToFileStream extends Writable {
  constructor() {
    super({ objectMode: true });
  }

  // 必须在 _write 中同步或异步调用 callback
  _write(chunk, encoding, callback) {
    console.log('==== _write is called using fs.createWriteStream ====');
    const writer = fs.createWriteStream(chunk.path);
    writer.write(chunk.content);
    writer.end();
    process.nextTick(callback);

    // fs.writeFile(chunk.path, chunk.content, callback);
  }
}

module.exports = ToFileStream;

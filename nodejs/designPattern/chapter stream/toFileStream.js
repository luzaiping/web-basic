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

  _write(chunk, encoding, callback) {
    console.log('==== _write is called ====', chunk);

    // 不可以在 _write 方法中调用 writeable 的公共 API 方法
    // 比如下面的 write 和 end, 否则会导致行为不确定
    // 这个例子，就出现外面调用 3次 write，这边只执行了1次
    // const writer = fs.createWriteStream(chunk.path);
    // writer.write(chunk.content);
    // writer.end();

    fs.writeFile(chunk.path, chunk.content, callback);

    // mkdirp(path.dirname(chunk.path), err => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     fs.writeFile(chunk.path, chunk.content, callback);
    //     // fs.createWriteStream(chunk.path).write()
    //   }
    // });
  }
}

module.exports = ToFileStream;

/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/**
 * inherit from base class using Object.create and util.inhert
 */

const { Readable } = require('stream');
const util = require('util');
const fs = require('fs');

// wrap an I/O source with a streamable API that provides a higher-level interface
// that would otherwise be possible with the underlying data.
class JSONLineReader extends Readable {
  constructor(source) {
    super();
    this._source = source; // a readable
    this._buffer = '';
    // 当有数据可以从 source 中读取时，触发 readable 事件
    // 即数据源的数据已经到达 source 的 buffer，等待被读取
    // 这时候调用 read 读取数据
    source.on('readable', () => {
      this.read();
    });
  }

  _read(size) {
    let chunk;
    let line;
    let result;

    if (this._buffer.length === 0) {
      chunk = this._source.read();
      this._buffer += chunk;
    }

    const lineIndex = this._buffer.indexOf('\n'); // current line break index

    if (lineIndex !== -1) {
      line = this._buffer.slice(0, lineIndex);
      if (line) {
        result = JSON.parse(line);
        this._buffer = this._buffer.slice(lineIndex + 1);
        this.emit('object', result);
        this.push(util.inspect(result));
      } else {
        this._buffer = this._buffer.slice(1);
      }
    }
  }
}

const reader = fs.createReadStream(`${__dirname}/json-lines.txt`, {
  encoding: 'utf8'
});

const jsonLineReader = new JSONLineReader(reader);

jsonLineReader.on('object', function({ name, age }) {
  console.log(`name: ${name}, age: ${age}`);
});

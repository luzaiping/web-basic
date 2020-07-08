const stream = require('stream');
const util = require('util');
const fs = require('fs');

class JSONLineReader extends stream.Readable {
  constructor(source) {
    super();
    this.source = source;
    this.foundLineEnd = false;
    this.buffer = '';

    source.on(
      'readable',
      function() {
        this.read();
      }.bind(this)
    );
  }

  // eslint-disable-next-line no-underscore-dangle
  _read() {
    let chunk;
    let line;
    let result;

    if (this.buffer.length === 0) {
      chunk = this.source.read();
      this.buffer += chunk;
    }

    const lineIndex = this.buffer.indexOf('n');

    if (lineIndex !== -1) {
      line = this.buffer.slice(0, lineIndex);
      if (line) {
        // result = JSON.parse(line);
        result = line;
        this.emit('object', result);
        this.push(util.inspect(result));
        this.buffer = this.buffer.slice(lineIndex + 1);
      } else {
        this.buffer = this.buffer.slice(1);
      }
    }
  }
}

const input = fs.createReadStream(`${__dirname}/json-lines.txt`, {
  encoding: 'utf-8'
});

const jsonReader = new JSONLineReader(input);

jsonReader.on('object', obj => {
  console.log('name:', obj);
  // console.log('name:', obj.name, '- age:', obj.age);
});

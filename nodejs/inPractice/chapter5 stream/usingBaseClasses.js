
/**
 * inherit from base class using Object.create and util.inhert
 */

const Readable = require('stream').Readable;
const stream = require('stream');
const util = require('util');
const fs = require('fs');

const basicInheritance = () => {
  function MyReadStream(options) {
    Readable.call(this, options); // call base class's constructor to run essential setup code.
  }
  
  // In Node, util.inherits can be used instead of Object.create
  // util.inherits(MyReadStream, Readable);
  MyReadStream.prototype = Object.create(Readable.prototype, { // using Object.create to correctly setup up the prototype chain
    constructor: { value: MyReadStream }
  });
}

// wrap an I/O source with a streamable API that provides a higher-level interface 
// that would otherwise be possible with the underlying data.
const jsonLineParser = () => {

  function JSONLineReader(source) {
    stream.Readable.call(this);
    this._source = source;
    this.foundLineEnd = false;
    this._buffer = '';

    source.on('readable', function() {
      this.read();
    }.bind(this));
  }

  util.inherits(JSONLineReader, stream.Readable);

  JSONLineReader.prototype._read = function () {
    let chunk;
    let line;
    let lineIndex;
    let result;

    if (this._buffer.length === 0) {
      chunk = this._source.read();
      this._buffer += chunk;
    }

    lineIndex = this._buffer.indexOf('\n'); // current line break index

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

  const input = fs.createReadStream(__dirname + '/json-lines.txt', {
    encoding: 'utf8'
  });

  const jsonLineReader = new JSONLineReader(input);

  jsonLineReader.on('object', function ({name, age}) {
    console.log(`name: ${name}, age: ${age}`);
  })
};

jsonLineParser();
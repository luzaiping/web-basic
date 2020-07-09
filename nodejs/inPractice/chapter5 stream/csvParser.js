/* eslint-disable no-underscore-dangle */
const { Transform } = require('stream');
const fs = require('fs');

class CsvParser extends Transform {
  constructor(options) {
    super(options);
    this.value = '';
    this.values = [];
    this.headers = [];
    this.line = 0;
  }

  _transform(chunk, encoding, done) {
    let c;

    const data = chunk.toString();

    for (let i = 0; i < data.length; i++) {
      c = data.charAt(i);

      if (c === ',') {
        this.addValue();
      } else if (c === 'n') {
        this.addValue();
        if (this.line > 0) {
          this.push(JSON.stringify(this.toObject())); // 将数据写入到 internal queue
        }
        this.values = [];
        this.line++;
      } else {
        this.value += c;
      }
    }
    done();
  }

  toObject() {
    const obj = {};
    const { length } = this.headers;
    for (let i = 0; i < length; i++) {
      obj[this.headers[i]] = this.values[i];
    }
  }

  addValue() {
    const target = this.line === 0 ? this.headers : this.values;
    target.push(this.value);
    this.value = '';
  }
}

const parser = new CsvParser();

const reader = fs.createReadStream(`${__dirname}/sample.csv`);

reader.pipe(parser).pipe(process.stdout);

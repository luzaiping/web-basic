const { Readable } = require('stream');

class MemoryStream extends Readable {
  constructor(options = {}) {
    const newOptions = {
      ...options,
      objectMode: true
    };
    super(newOptions);
    this.limit = 10;
  }

  // eslint-disable-next-line no-underscore-dangle
  _read() {
    const usage = process.memoryUsage();
    let i = 0;
    while (i < this.limit) {
      this.push(usage);
      i++;
    }

    this.push(null);
  }
}

const memoryStream = new MemoryStream();

memoryStream.on('readable', () => {
  let chunk = memoryStream.read();

  while (chunk) {
    console.log(`Type: ${typeof chunk}, value: ${JSON.stringify(chunk)}`);
    chunk = memoryStream.read();
  }
});

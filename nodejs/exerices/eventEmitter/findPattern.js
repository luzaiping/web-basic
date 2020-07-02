const fs = require('fs');
const EventEmitter = require('events');

class FindPattern extends EventEmitter {
  constructor(pattern) {
    super();
    this.pattern = pattern;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    this.files.forEach(file => {
      const absoluteFileName = `${__dirname}/${file}`;
      fs.readFile(absoluteFileName, 'utf8', (err, content) => {
        if (err) {
          this.emit('error', err);
        } else {
          this.emit('fileread', file);

          const match = content.match(this.pattern);
          if (match) {
            match.forEach(item => {
              this.emit('found', file, item);
            });
          }
        }
      });
    });
    return this;
  }
}

const findPattern = new FindPattern(/hello \w+/g);
findPattern
  .addFile('fileA.txt')
  .addFile('fileB.json')
  .find()
  .on('fileread', file => {
    console.log(`file ${file} is reading...`);
  })
  .on('found', (file, content) => {
    console.log(`${content} is matched in file ${file}`);
  })
  .on('error', err => {
    console.error(err);
  });

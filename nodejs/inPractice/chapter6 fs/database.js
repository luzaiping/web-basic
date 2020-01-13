const fs = require('fs');
const EventEmitter = require('events').EventEmitter;

const encodingOption = {
  encoding: 'utf8'
};

function Database(path) {
  this.path = path;
  this.records = Object.create(null);
  this.writeStream = fs.createWriteStream(this.path, {
    ...encodingOption,
    flags: 'a'
  });

  this.load();
}

// inherit from EventEmitter
Database.prototype = Object.create(EventEmitter.prototype);

Database.prototype.load = () => {
  const readStream = fs.createReadStream(this.path, encodingOption);

  let data = '';

  readStream.on('reabable', () => {
    data += readStream.read();
    const records = data.split('\n');
    data = records.pop();
    for (const recordStr of records) {
      try {
        const { key, value } = JSON.parse(recordStr);
        if (value === null) {
          delete this.records[key];
        } else {
          this.records[key] = value;
        }
      } catch (error) {
        this.emit('error', 'found invalid record: ', recordStr);
      }
    }
  });

  readStream.on('end', () => {
    this.emit('load');
  });
};

Database.prototype.get = key => this.records[key] || null;

Database.prototype.set = (key, value, cb) => {
  const toWriteData = JSON.stringify({ key, value }) + '\n';

  if (value === null) {
    delete this.records[key];
  } else {
    this.records[key] = value;
  }

  this.writeStream.write(toWriteData, cb);
};

Database.prototype.del = (key, cb) => this.set(key, null, cb);

module.exports = Database;

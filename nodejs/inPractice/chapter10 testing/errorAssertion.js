const assert = require('assert');
const fs = require('fs');

function readConfigFile(cb) {
  fs.readFile('not existing file', (err, data) => {
    if (err && err.code === 'ENOENT') {
      cb(null, 'get default config');
    } else if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
}

readConfigFile((err, data) => {
  assert.ifError(err);
  console.log(data);
});

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, './stepTeach/package.json');

fs.access(file, fs.constants.F_OK, (err) => {
  if (err) throw err;
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});

fs.access(file, fs.constants.R_OK, (err) => {
  if (err) throw err;
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
});

fs.access(file, fs.constants.W_OK, (err) => {
  if (err) throw err;
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
});

fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error(
      `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is not readable'}` // ENOENT: Error NO ENTity (ENTry)
    )
  } else {
    console.log(`${file} exists , and it is writable`);
  }
});


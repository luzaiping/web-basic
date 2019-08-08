const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'a.txt');

// options: { encoding: 'utf8', flag: 'a' }
fs.appendFile(file, 'data to append', (err) => {
  if (err) throw err;
  console.log(`data is appended to ${file} successfully.`)
})
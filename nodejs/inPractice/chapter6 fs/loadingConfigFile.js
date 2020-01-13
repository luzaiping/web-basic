const fs = require('fs');
const path = require('path');

const doWithConfig = config => {
  console.log(config);
};

const filePath = path.join(__dirname, 'config.json');

// async mode
fs.readFile(filePath, (err, buf) => {
  if (err) throw err;
  const config = JSON.parse(buf.toString());
  doWithConfig(config);
});

// sync mode
// const config = JSON.parse(fs.readFileSync(filePath).toString());
// doWithConfig(config);

const http = require('http');
const makePooling = require('./jobPooling');

const runJob = makePooling('./jobsChild.js');

http
  .createServer((req, res) => {
    runJob('some dummy job', (err, data) => {
      const endResult = err ? `got an error: ${err.message}` : data;
      res.end(endResult);
    });
  })
  .listen(3000);

const Chance = require('chance');
const http = require('http');

const chance = new Chance();

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    function generateMore() {
      while (chance.bool({ likelihood: 95 })) {
        const length = 16 * 1024 - 1;
        const shouldContinue = res.write(`${chance.string({ length })}`);
        if (!shouldContinue) {
          console.log('BackPressure');
          res.once('drain', generateMore);
          break;
        }
      }
      res.end('\n The end ... \n');
      res.on('finish', () => {
        console.log('All data was sent.');
      });
    }
    generateMore();
  })
  .listen(8080, () => {
    console.log('Listenering on http://localhost:8080');
  });

const Chance = require('chance');
const http = require('http');

const chance = new Chance();

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    function generateMore() {
      console.log('========== generateMore ==========');
      // 95% 的可能会返回 true
      while (chance.bool({ likelihood: 95 })) {
        const length = 16 * 1024 - 1;
        const shouldContinue = res.write(`${chance.string({ length })}`);
        if (!shouldContinue) {
          console.log('BackPressure');

          // 使用 return 会中断 generateMore 函数的执行；等 drain 事件被触发后，重新执行 generateMore
          return res.once('drain', generateMore);

          // 使用 break 会跳出 while 循环，然后往下执行 res.end，最终结束整个输出流，所以不会触发 drain 事件
          // res.once('drain', generateMore);
          // break;
        }
      }
      res.end('\n The end ... \n', console.log('All data was sent.'));
      return null;
    }

    generateMore();
  })
  .listen(8080, () => {
    console.log('Listenering on http://localhost:8080');
  });

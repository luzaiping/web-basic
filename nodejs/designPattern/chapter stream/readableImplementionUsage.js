const RandomStream = require('./readableImplemention');

const randomStream = new RandomStream();

randomStream.on('readable', () => {
  console.log('= readable =');
  // 读取通过 push 添加到 内部缓冲的数据
  let chunk = randomStream.read();

  while (chunk) {
    console.log(`Chunk Received: ${chunk.toString()}`);
    chunk = randomStream.read();
  }
});

randomStream.on('end', () => {
  console.log('= end =');
});

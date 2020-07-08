const fs = require('fs');

function readUsingStream() {
  const reader = fs.createReadStream('./stream.txt');

  // reader.on('readable', function() {
  //   let data;
  //   // eslint-disable-next-line no-cond-assign
  //   while ((data = this.read())) {
  //     // readable.read() 一次最多可以读取 64KB 的数据
  //     // 如果数据大小超过 64KB，就需要分成多次读取
  //     console.log('==============================\n');
  //     console.log(`${data.length}\n`);
  //   }
  // });

  reader.on('data', chunk => {
    console.log('**************************************\n');
    console.log(`${chunk.length}\n`);
  });

  reader.on('end', () => {
    console.log('使用 readStream 读取数据完毕。');
  });
}

function readOneTime() {
  fs.readFile('./stream.txt', (err, data) => {
    // 这边数据是一口气读取到内存中，等读取完毕后，才会触发 callback
    if (err) throw err;
    console.log('数据读取完毕，读取的数据大小是：', data.length);
  });
}

readUsingStream();
readOneTime();

const endHandler = () => {
  // 一旦没有数据了，会告知应用程序，然后触发 end 事件
  process.stdout.write('End of stream');
};

// Paused Mode
// process.stdin
//   .on('readable', () => {
//     // 有数据进来，会尽快触发 readable 事件
//     console.log('New data available');
//     // readable.read() 是一个同步操作，是从 buffer 中 pull 数据
//     let chunk = process.stdin.read();
//     while (chunk) {
//       console.log(`Chunk read: (${chunk.length}) ${chunk.toString()}`);
//       chunk = process.stdin.read();
//     }
//   })
//   .on('end', endHandler);

// Flowing Mode
process.stdin
  .on('data', chunk => {
    console.log('New data available');
    console.log(`Chunk read: (${chunk.length}) ${chunk.toString()}`);
  })
  .on('end', endHandler);

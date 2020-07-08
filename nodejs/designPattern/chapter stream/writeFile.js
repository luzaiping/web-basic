const fs = require('fs');

function writeFileUsingStream() {
  // 通过 createWriteStream 创建一个 stream.writeable
  const writable = fs.createWriteStream('./writeUsingStream.txt');

  const callback = (err, msg) => {
    if (err) throw err;
    console.log(msg);
  };

  writable.setDefaultEncoding('utf-8');
  writable.write('你', err => {
    callback(err, 'callback1');
  });
  writable.write('大', err => {
    callback(err, 'callback2');
  });
  writable.write('爷', err => {
    callback(err, 'callback3');
  });

  writable.end('!');

  writable.on('finish', () => {
    console.log('All data is flushed into file.');
  });
}

function writeFileUsingBuffer() {
  fs.writeFile('./writeUsingBuffer.txt', '使用 fs.writeFile 写入数据', err => {
    if (err) throw err;
    console.log('write file using Buffer successfully!');
  });
}

writeFileUsingStream();
writeFileUsingBuffer();

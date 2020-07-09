const ToFileStream = require('./toFileStream.js');

const tfs = new ToFileStream();
tfs.write({ path: 'file1.txt', content: 'Hello' }, () => {
  console.log('file1 callback 被调用');
});
tfs.write({ path: 'file2.txt', content: 'Node.js' }, () => {
  console.log('file2 callback 被调用');
});
tfs.write({ path: 'file3.txt', content: 'Streams' }, () => {
  console.log('file3 callback 被调用');
});
tfs.end(() => console.log('All files created'));

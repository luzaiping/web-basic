const childProcess = require('child_process');

const child = childProcess.fork('./simpleIPCChild.js');

child.on('message', msg => {
  console.log('got message from child: ', msg);
  child.disconnect(); // disconnect the IPC channel
});

child.send('hello son!');

const fs = require('fs');
const { exec } = require('child_process');

function watch() {
  const child = exec('node server.js');
  const watcher = fs.watch(`${__dirname}/server.js`, () => {
    console.log('File changed, reloading.');
    child.kill();
    watcher.close();
    watch();
  });
}

watch();
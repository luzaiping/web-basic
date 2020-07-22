const { spawn } = require('child_process');

const ls = spawn('ls', ['-lh', '/']);

ls.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

/**
 * U need to use the underlying shell facilities to execute commands and get the output.
 */

const childProcess = require('child_process');

childProcess.exec('cat messy.txt | sort | uniq', (err, stdout) => {
  console.log('output:', stdout);
});

/* eslint-disable no-unused-vars */
const childProcess = require('child_process');

// Use execFile in case where U just need to execute an external application
// It's fast, simple,and safer when dealing with user input.
function execFileSync() {
  const stdout = childProcess.execFileSync('echo', ['hello']).toString();
  console.log(stdout);
}

// Use spawn when U want to do something more with the I/O of the child process, or
// when U expect the process to have a large amount of output.
// It provide a nice streamable interface, and is also safer when dealing with user input.
function spawnSync() {
  const ps = childProcess.spawnSync('ps', ['aux']);
  const grep = childProcess.spawnSync('grep', ['node'], {
    input: ps.stdout,
    encoding: 'utf8'
  });
  console.log(grep);
}

// Use exec when U want to access your shell's facilities(pips,redirects,blobs).
// Many shells allow running multiple application in one go.Be careful with user input
// though,as it's never a good idea to put untrusted input into an exec call.
function execSync() {
  const stdout = childProcess.execSync('ps aux | grep node').toString();
  console.log(stdout);
}

execSync();

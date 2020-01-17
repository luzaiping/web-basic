/* eslint-disable no-unused-vars */
const childProcess = require('child_process');

function execFileSync() {
  const stdout = childProcess.execFileSync('echo', ['hello']).toString();
  console.log(stdout);
}

function spawnSync() {
  const ps = childProcess.spawnSync('ps', ['aux']);
  const grep = childProcess.spawnSync('grep', ['node'], {
    input: ps.stdout,
    encoding: 'utf8'
  });
  console.log(grep);
}

function execSync() {
  const stdout = childProcess.execSync('ps aux | grep node').toString();
  console.log(stdout);
}

execSync();

/**
 * Detaching a process completely requires thress things
 */

const fs = require('fs');
const childProcess = require('child_process');

const outFileDescription = fs.openSync('./longrun.out', 'a');
const errorFileDescription = fs.openSync('./longrun.err', 'a');

const child = childProcess.spawn('./longrun', [], {
  detached: true, // 1. set this option to true
  stdio: ['ignore', outFileDescription, errorFileDescription] // 2. stdio must be configured so the parent and child are disconnected.
});

child.unref(); // 3. not to include this child process reference in parent's count

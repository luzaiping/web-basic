/**
 * U want to execute an external application and get the output.
 */
const childProcess = require('child_process');

// The execFile method buffers the result and provides a callback interface
// if command (eg. echo) is not in PATH, U should provide absolute or relatite path.
childProcess.execFile('echo', ['hello', 'world'], (err, stdout, stderr) => {
  if (err) console.error(err);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});

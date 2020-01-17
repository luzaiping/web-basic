const childProcess = require('child_process');

function doWork(job, cb) {
  const child = childProcess.fork('./jobsChild');
  let cbTriggered = false; // track if callback was callled.

  child
    .once('error', err => {
      if (!cbTriggered) {
        cb(err);
        cbTriggered = true;
      }
    })
    .once('exit', code => {
      if (!cbTriggered) {
        cb(new Error(`Child exited with code: ${code}`));
      }
    })
    .once('message', result => {
      cb(null, result);
      cbTriggered = true;
    })
    .send(job);
}

doWork();

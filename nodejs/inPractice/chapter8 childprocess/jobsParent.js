const childProcess = require('child_process');

function doWork(job, cb) {
  const subprocess = childProcess.fork('./jobsChild');
  let cbTriggered = false; // track if callback was callled.

  subprocess
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

doWork('This is dummy job', (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`job result: ${result}`);
  }
});

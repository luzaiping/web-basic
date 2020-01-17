const childProcess = require('child_process');
const os = require('os');

const cpus = os.cpus().length; // Grab number of CPUs
module.exports = function(workModule) {
  const awaiting = []; // Keep list of tasks that are queued to run when all processes are in use
  const readyPool = []; // Keep list of worker processes that are ready for work
  let poolSize = 0; // Keep track of how many worker processes exist

  return function doWork(job, cb) {
    // If no worker processes are available and we've reached
    // our limit, queue work to be run later
    if (!readyPool.length && poolSize > cpus) {
      return awaiting.push([doWork, job, cb]);
    }

    // Grab next available child,or fork a new process(incrementing the poolSize)
    let child;
    if (readyPool.length) {
      child = readyPool.shift();
    } else {
      child = childProcess.fork(workModule);
      poolSize += 1;
    }

    let cbTriggered = false;

    child
      .removeAllListeners()
      .once('error', err => {
        if (!cbTriggered) {
          cb(err);
          cbTriggered = true;
        }
        child.kill();
      })
      .once('exit', code => {
        if (!cbTriggered) {
          cb(new Error(`Child exited with code: ${code}`));
        }
        poolSize -= 1;
        const childIndex = readyPool.indexOf(child);
        if (childIndex > -1) readyPool.splice(childIndex, 1);
      })
      .once('message', msg => {
        cb(null, msg);
        cbTriggered = true;
        readyPool.push(child);
        if (awaiting.length) {
          // eslint-disable-next-line prefer-spread
          setImmediate.apply(null, awaiting.shift());
        }
      })
      .send(job);
    return null;
  };
};

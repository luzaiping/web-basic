const fs = require('fs');
const hasLock = false;
const lockDir = 'config.lock';
const lockDirWithPID = `${lockDir}/${process.pid}`;

exports.lock = cb => {
  if (hasLock) return cb();

  fs.mkdir(lockDir, err => {
    if (err) return cb();
    fs.writeFile(lockDirWithPID, err => {
      if (err) console.error(err);
      hasLock = true;
      return cb();
    });
  });
};

exports.unlock = cb => {
  if (!hasLock) return cb();

  fs.unlink(lockDirWithPID, err => {
    if (err) return cb(err);
    fs.rmdir(lockDir, err => {
      if (err) return cb(err);
      hasLock = false;
      cb();
    });
  });

  process.on('exit', () => {
    if (hasLock) {
      fs.unlinkSync(lockDirWithPID);
      fs.rmdirSync(lockDir);
      console.log('removed lock');
    }
  });
};

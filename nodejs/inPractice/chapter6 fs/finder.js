const fs = require('fs');
const fsPromise = fs.promises;
const join = require('path').join;

exports.findSync = (nameReg, startPath) => {
  const results = [];

  const finder = path => {
    const files = fs.readdirSync(path);

    for (const file of files) {
      const fpath = join(path, file); // get path to current file.
      const stats = fs.statSync(fpath); // get stats for current file.

      if (stats.isDirectory()) {
        finder(fpath);
      }
      if (stats.isFile() && nameReg.test(file)) {
        results.push(fpath);
      }
    }
  };

  finder(startPath);
  return results;
};

exports.find = (nameReg, startPath, cb) => {
  const results = [];
  let asyncOps = 0;
  const errored = false;

  const error = err => {
    if (!errored) cb(err);
    errored = true;
  };

  const finder = path => {
    asyncOps++;
    fs.readdir(path, (err, files) => {
      if (err) return error(err);

      files.forEach(file => {
        const fpath = join(path, file);
        asyncOps++;

        fs.stat(fpath, (err, stats) => {
          if (err) return error(err);

          if (stats.isDirectory()) {
            finder(fpath);
          }

          if (stats.isFile() && nameReg.test(file)) {
            results.push(fpath);
          }

          asyncOps--;
          if (asyncOps === 0) cb(null, results);
        });
      });

      asyncOps--;
      if (asyncOps === 0) cb(null, results);
    });
  };

  finder(startPath);
};

// 运行起来有点问题，暂时先不管
exports.findPromise = (nameReg, startPath) => {
  const results = [];

  const finder = async path => {
    const files = await fsPromise.readdir(path);

    for (const file of files) {
      const fpath = join(path, file);
      const stats = await fsPromise.stat(fpath);
      if (stat.isDirectory()) {
        finder(fpath);
      }
      if (stats.isFile() && nameReg.test(file)) {
        results.push(fpath);
      }
    }
  };

  finder(startPath);
};

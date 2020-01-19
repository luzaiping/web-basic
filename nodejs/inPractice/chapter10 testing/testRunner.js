/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

/**
 * usage: node testRunner test.js test2.js test3.js
 */
let exitCode = 0;
const filenames = process.argv.slice(2);

global.it = function(name, test) {
  let err;

  try {
    test();
  } catch (e) {
    err = e;
  }

  console.log(' - it', name, err ? '[FAIL]' : '[OK]');

  if (err) {
    console.error(err);
    console.error(err.stack);
    exitCode = 1;
  }
};

filenames.forEach(filename => {
  console.log(filename);
  require(`./${filename}`);
});

process.on('exit', () => {
  process.exit(exitCode);
});

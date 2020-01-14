const finder = require('./finder');

const nameReg = /(.+)\.js$/;
const startPath = 'E:/work/projects/frontEndBasic/nodejs';

/* try {
  const files = finder.findSync(nameReg, startPath);
  console.log(files);
} catch (error) {
  console.error(error);
} */

finder.find(nameReg, startPath, (err, results) => {
  if (err) return console.error(err);
  console.log(results);
});

/* try {
  const results = finder.findPromise(nameReg, startPath);
  console.log(results);
} catch (error) {
  console.error(error);
} */

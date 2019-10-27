/**
 * passing command-line arguments
 * you need to receive simple arguments from command line
 * use process.argv
 */

const args = {
  '-h': displayHelp,
  '-r': readFile
}

function displayHelp () {
  console.log('Argument processor:', args);
}

function readFile (fileName = '') {
  if (fileName.length > 0) {
    console.log('Reading: ', fileName);
    require('fs').createReadStream(fileName).pipe(process.stdout);
  } else {
    console.error('A file must be provided with the -r option');
    process.exit(1);
  }
}

// 官方的写法
/* if (process.argv.length > 0) {
  process.argv.forEach((arg, index) => {
    console.log('current arg:', arg);
    const fn = args[arg];
    if (fn && typeof fn === 'function') {
      fn.apply(this, process.argv.slice(index + 1));
    } else {
      console.warn('unsupported argument: ', arg);
    }
  })
} */

// ES6 的写法
const [,, option, ...rest] = process.argv;
if (option) {
  console.log('current option: %s, args: %s', option, rest);
  const fn = args[option];
  if (fn && typeof fn === 'function') {
    fn.apply(this, rest);
  } else {
    console.error('unsupported arg %s', option);
  }
} else {
  console.error('You need to specify arg');
}
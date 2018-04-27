let args = {
  '-r': readFile,
  '-h': displayHelp
}

function readFile(file) {
  if (file && file.length) {
    console.log('Reading:', file)
    require('fs').createReadStream(file).pipe(process.stdout)
  } else {
    console.error('A file must be provided with the -r option')
    process.exit(1)
  }
}

function displayHelp() {
  console.log('Argument processor:', args)
}

if (process.argv.length > 0) {
  process.argv.forEach((key, index) => {
    let fn = args[key]
    fn && fn.apply(this, process.argv.slice(index + 1))
  })
}


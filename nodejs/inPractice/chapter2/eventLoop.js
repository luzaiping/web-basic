function unDeterministic() {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  
  setImmediate(() => {
    console.log('immediate');
  });
}

function runInIOCycle() {
  let fs = require('fs')
  fs.readFile(__filename, 'utf8', () => {
    setImmediate(() => {
      console.log('immediate....')
    })
    setTimeout(() => {
      console.log('timeout...')
    }, 0)
  })
}

runInIOCycle()
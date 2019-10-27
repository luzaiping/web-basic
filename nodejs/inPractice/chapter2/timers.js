
function timeout() {
  function Bomb(message = 'bomb!') {
    this.message = message
  }
  
  Bomb.prototype.explore = function() {
    console.log(this.message)
    timeoutId && clearTimeout(timeoutId)
  }
  
  let bomb = new Bomb()
  
  let timeoutId = setTimeout(bomb.explore.bind(bomb), 1000)
}

function internal() {
  
  function tick() {
    console.log('tick:', Date.now())
  }

  function tock() {
    console.log('tock:', Date.now())
  }

  setInterval(tick, 1000)

  setTimeout(function() {
    setInterval(tock, 1000)
  }, 500)
}

function unRef() {
  
  function monitor() {
    console.log(process.memoryUsage())
  }

  let id = setInterval(monitor, 1000)
  id.unref()

  setTimeout(function() {
    console.log('Done!')
  }, 5000)
}


function nextTick() {

  let EventEmitter = require('events').EventEmitter

  function complexOperations() {
    let events = new EventEmitter()

    process.nextTick(function() { // callback will be push at the head of queue in next event loop cycle.
      events.emit('success')
    })

    return events
  }

  complexOperations().on('success', function() {
    console.log('success!')
  })
}
// nextTick()

const fs = require('fs');
let content;

function readFileIfRequired(cb) {
  if (!content) {
    fs.readFile(__filename, 'utf8', (err, data) => {
      if (err) throw err;
      console.log('readFileIfRequired: readFile');
      content = data;
      cb(err, data);
    });
  } else {
    process.nextTick(() => {
      console.log('readFileIfRequired: cached');
      cb(null, content);
    });
  }
}

readFileIfRequired((err, data) => {
  console.log('1. Length:', data.length);
  readFileIfRequired((err, data2) => {
    console.log('2. Length:', data2.length);
  });
  console.log('Reading file again...');
});

console.log('Reading file...');
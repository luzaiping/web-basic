const readline = require('readline')

function basicUsage() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  rl.question('what do you think of Node.js?\n', answer => {
    console.log(`Thank you for your valuable feedback: ${answer}`)
    // rl.close()
  })
  
  rl.on('close', () => {
    console.log('rl is closed.')
  })
  
  rl.on('line', input => {
    console.log(`Received: ${input}`)
  })
  
  rl.on('pause', () => {
    console.log('Readline paused.')
  })
  
  rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit?', answer => {
      if (answer.match(/^y(es)?$/i)) rl.pause()
    })
  })
}

function tinyCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI>' // 设置提示符
  })

  rl.prompt() // 给出一个新的提示输入位置，如果之前被 paused，调用这个方法会 resume

  rl.on('line', line => {
    switch(line.trim()) {
      case 'hello':
        console.log('world!')
        break
      default:
        console.log(`Say what? I might have heard ${line.trim()}`)
        break
    }
    rl.prompt() // 输出内容后，会紧接着一个新的输入提示
  })
  .on('close', () => {
    console.log('Have a good day!')
    process.exit(0)
  })
}

// tinyCLI()

function readFileLineToLine() {
  const fs = require('fs')

  const rl = readline.createInterface({
    input: fs.createReadStream('sample.txt'),
    crlfDelay: Infinity
  })

  rl.on('line', line => {
    console.log(`Line from file: ${line}`)
  })
}

readFileLineToLine()
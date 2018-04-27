
process.stdin.resume()  // tell the stream we're ready to start reading.
process.stdin.setEncoding('utf8')
process.stdin.on('data', text => {
  process.stdout.write(text.toUpperCase())
})
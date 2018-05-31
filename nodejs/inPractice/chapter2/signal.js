process.stdin.resume()

process.on('SINGUP', function() {
  console.log('Reloading configuration...')
})

console.log('pid:', process.pid)
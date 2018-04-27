let CountStream = require('./countStream.js')
let countStream = new CountStream('book')
let http = require('http')

http.get('http://www.manning.com', function(res) {
  res.pipe(countStream)
})

countStream.on('total', function(count) {
  console.log('Total matches: ', count)
})


export default countStream
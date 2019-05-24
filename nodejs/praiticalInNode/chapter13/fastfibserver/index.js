var fastfib = require('fastfib');
var http = require('http')

http.createServer(function (req, res) {
  res.end('' + fastfib(40));
}).listen(3000);

console.log('fastfibber running on port 3000');
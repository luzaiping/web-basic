const http = require('http');
const url = require('url');

http
  .createServer((req, res) => {
    console.log('start request:', req.url);
    const options = url.parse(req.url);
    options.headers = req.headers;

    const proxyRequest = http.request(options, proxyResponse => {
      proxyResponse.on('data', chunk => {
        console.log('proxyResponse length', chunk.length);
        res.write(chunk, 'binary'); // 将数据返回给 client
      });

      proxyResponse.on('end', () => {
        console.log('proxied request ended.');
        res.end();
      });

      res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    });

    req.on('data', chunk => {
      console.log('in request length', chunk.length);
      proxyRequest.write(chunk); // 将请求数据转给 proxyRequest
    });

    req.on('end', () => {
      console.log('original request ended.');
      proxyRequest.end();
    });
  })
  .listen(9090);

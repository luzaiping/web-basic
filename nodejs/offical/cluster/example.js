const cluster = require('cluster');
const http = require('http');
const { length: numCPUs } = require('os').cpus();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running.`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http
    .createServer((req, res) => {
      console.log(`Worker ${process.pid} receives request.`);
      res.writeHead(200);
      res.end('hello world \n');
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}

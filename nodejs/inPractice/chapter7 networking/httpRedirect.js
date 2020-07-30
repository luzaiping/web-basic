const http = require('http');
const https = require('https');
const url = require('url');

const MAX_REDIRECTS = 10;

class Request {
  constructor() {
    this.redirects = 0;
  }

  get(href, callback) {
    const uri = url.parse(href);
    const { protocol, host, path } = uri;
    const options = { host, path };
    const httpGet = protocol === 'http:' ? http.get : https.get;

    console.log(`GET: ${href}`);
    // 这边的 response 是 IncomingMessage 类型
    httpGet(options, response => {
      this.processResponse(response, host, href, callback);
    });
  }

  // 判断是否需要重定向，如果需要就重新请求目标地址
  // 如果不需要就返回内容
  processResponse(response, host, href, callback) {
    const { statusCode, headers } = response;
    const { location } = headers;
    const needRedirect = statusCode >= 300 && statusCode < 400;
    if (needRedirect) {
      if (this.redirects >= MAX_REDIRECTS) {
        this.error = new Error(`Too many redirects for: ${href}`);
      } else {
        this.redirects++;
        const newHref = url.resolve(host, location);
        console.log('Redirect: ', newHref);
        this.get(newHref, callback);
      }
    } else {
      response.url = href;
      response.redirects = this.redirects;

      response.on('data', data => {
        console.log(`Got data, length:${data.length}`);
      });

      response.on('end', () => {
        console.log('Connection ended.');
        callback(this.error, response);
      });
    }
  }
}

const request = new Request();

request.get('http://www.google.cn', (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(
      `Fetched URL: ${response.url} with ${response.redirects} redirects`
    );
    process.exit();
  }
});

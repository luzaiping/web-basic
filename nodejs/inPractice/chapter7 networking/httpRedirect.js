const http = require('http');
const https = require('http2');
const url = require('url');

function Request() {
  this.maxRedirects = 10;
  this.redirects = 0;
}

// this is comment
Request.prototype.get = function(href, callback) {
  const { host, path, protocol } = url.parse(href);
  const options = { host, path };
  const httpGet = protocol === 'http:' ? http.get : https.get;

  console.log('GET:', href);

  const processResponse = response => {
    const { statusCode, headers } = response;
    if (statusCode >= 300 && statusCode < 400) {
      if (this.redirects >= this.maxRedirects) {
        this.error = new Error('Too many redirects for:', href);
      } else {
        this.redirects += 1;
        const redirectHref = url.resolve(host, headers.location);
        this.get(redirectHref, callback);
      }
    }
    response.url = href;
    response.redirects = this.redirects;
    console.log('Redirected:', href);

    const end = () => {
      console.log('Connection ended');
      callback(this.error, response);
    };

    response.on('end', end);
  };

  httpGet(options, processResponse).on('error', callback);
};

const request = new Request();

request.get('http://baidu.com/', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Fetched URL:', res.url, 'with', res.redirects, ' redirects');
    process.exit();
  }
});

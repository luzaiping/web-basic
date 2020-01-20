const assert = require('assert');
const http = require('http');

function request(method, url, cb) {
  http.request(
    {
      hostname: 'localhost',
      port: 8000,
      path: url,
      method
    },
    res => {
      res.body = '';
      res.on('data', chunk => {
        res.body += chunk;
      });
      res.on('end', () => {
        cb(res);
      });
    }
  );
}

describe('Example web app', function() {
  it('should square numbers', function(done) {
    request('GET', '/square/4', function(res) {
      assert.equal(res.statusCode, 200);
      assert.equal(res.body, '16');
      done();
    });
  });

  it('should return a 500 for invalid square requests', function(done) {
    request('GET', '/square', function(res) {
      assert.equal(res.statusCode, 500);
      done();
    });
  });
});

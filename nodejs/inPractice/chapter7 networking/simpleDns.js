const dns = require('dns');

dns.lookup('www.baidu.com', (err, address) => {
  if (err) {
    console.error('Error:', err);
  }
  console.log('Addresses:', address);
});

dns.resolve('www.baidu.com', (err, address) => {
  if (err) {
    console.error('Error:', err);
  }
  console.log('Addresses:', address);
});

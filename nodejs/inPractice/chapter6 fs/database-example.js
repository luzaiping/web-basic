const Database = require('./database');
const path = require('path');

const filePath = path.join(__dirname, 'test.db');
const client = new Database(filePath);

client.on('load', () => {
  const foo = client.get('foo');
  console.log('get foo=', foo);

  client.set('bar', 'my sweet value', err => {
    if (err) return console.error(err);
    console.log('write successfully.');
  });

  client.del('baz');
});

let babel = require('babel-core');

let result = babel.transform('const result = 0.1 + 0.2;', {
  plugins: [require('./calculator')]
})

console.log(result.code);
var path = require('path');

var filePath = 'E:\\www\\fastfib\\basic\\Path\\index.js',
    ext = '.js';


/*
var pathArr = process.env.PATH.split(path.delimiter);

// console.log(pathArr);
console.log('delimiter: ', path.delimiter);
console.log(path.dirname(filePath));
console.log(path.basename(filePath));
console.log(path.basename(filePath, ext));

console.log(path.extname(filePath));
console.log(path.extname('.index'), path.extname('index')); // return '', ''

console.log(path.format({
    root: 'd:\\', // ignore
    dir: 'c:\\', // override root property
    base: 'test.js', // override name and ext
    name: 'aaa', // ignore
    ext: '.js' // ignore
}));

console.log(path.isAbsolute('/usr/bin/aaa.html'));
console.log(path.isAbsolute('c://ddd.html'));
console.log(path.join('')); // return '.'
console.log(path.parse(filePath));
*/

// console.log(path.relative('c:\\user\\app\\test.html', 'c:\\work\\user\\ccc.html'));

// console.log(path.resolve('/foo/bar', './baz'));
// console.log(path.resolve('/foo/bar', '/baz'));
// console.log(path.resolve('foo/bar', 'baz'));

console.log(path.sep);

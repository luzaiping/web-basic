/* eslint-disable */
/**
 * 函数式编程函数模拟
 */

function curry(fn, ...rest) {
  return function(...args) {
    return fn.apply(this, [...rest, ...args]);
  }
}

/* function add(a, b) {
  return a + b;
}

var addCurry = curry(add, 1, 2);
console.log(addCurry()) // 3
//或者
var addCurry = curry(add, 1);
console.log(addCurry(2)) // 3
//或者
var addCurry = curry(add);
console.log(addCurry(1, 2)) // 3 */

function memoize(f) {
  const cache = {};
  return function(...args) {
    const key = `${args.length}${args.join(',')}`;
    const hasKey = key in cache;
    if (!hasKey) {
      cache[key] = f.apply(this, args);
    }
    return cache[key];
  }
}

var add = function(a, b, c) {
  return a + b + c
}

var memoizedAdd = memoize(add)

console.time('use memoize');
let now = new Date();
for(var i = 0; i < 100000; i++) {
    memoizedAdd(1, 2, 3)
}
console.timeEnd('use memoize', new Date() - now);

console.time('not use memoize')
now = new Date();
for(var i = 0; i < 100000; i++) {
    add(1, 2, 3)
}
console.timeEnd('not use memoize', new Date() - now)
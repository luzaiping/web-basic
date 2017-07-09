let { partical } = require('./SomeNowSomeLater')

// 将原先函数的参数顺序进行倒序
function reverseArgs(fn) {
    return function argsReversed(...args) {
        return fn(...args.reverse())
    }
}

function test(x, y, z) {
    return (x + y) * z
}

console.log(test(1, 2, 3))

let testArgsReversed = reverseArgs(test)
console.log(testArgsReversed(1, 2, 3))

let cache = {}



module.exports = { reverseArgs }
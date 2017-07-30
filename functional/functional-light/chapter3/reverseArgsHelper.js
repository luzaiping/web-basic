// 将原先函数的参数顺序进行倒序
function reverseArgs(fn) {
    return function argsReversed(...args) {
        return fn(...args.reverse())
    }
}

module.exports = reverseArgs
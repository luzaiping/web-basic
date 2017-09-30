const reverseArgs = require('../chapter3/reverseArgsHelper')

function compose(...fn) {
    return function composed(result) {
        let listFn = fn.slice()
        while (listFn.length > 0) {
            result = listFn.pop()(result)
        }
        return result
    }
}

const composeES6 = (...fns) => result => {
    let listFn = fns.slice()
    while (listFn.length > 0) {
        result = listFn.pop()(result)
    }
    return result
}

// unary first call. 这个版本第一个函数只能接收一个参数，fns的参数顺序就是被调用的顺序，即from left-to-right
function composeReduceUnary(...fns) {
    return function composed(result) {
        return fns.reverse().reduce(function(value, fn) { // fns.reverse().reduce 可以直接用 fns.reduceRight 代替
            return fn(value)
        }, result)
    }
}

function composeReduce(...fns) {
    return fns.reduceRight(function reducer(fn1, fn2) {
        return function composed(...args) {
            return fn2(fn1(...args))
        }
    })
}

function pipe(...fns) {
    return function composed(result) {
        let listFn = fns.slice()
        while (listFn.length > 0) {
            result = listFn.shift()(result)
        }
        return result
    }
}

const pipeUsingRevert = reverseArgs(compose)

module.exports = {
    compose,
    composeES6,
    composeReduceUnary,
    composeReduce,
    pipe,
    pipeUsingRevert
}
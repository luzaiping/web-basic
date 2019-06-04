function curry(fn, arity = fn.length) {
    return (function nextCurried(prevArgs) {// prevArgs 是一个数组
        return function curried(nextArg) {// nextArg不是数组,只能是一个参数
            let args = prevArgs.concat([nextArg])
            if (args.length >= arity) {
                return fn(...args) // 当参数个数已经达到原始函数的parameter个数，则执行原先函数，参数是已经收集的所有arguments
            } else {
                return nextCurried(args) // 如果参数个数没有达到所需的个数，则返回下一个函数，接收之前已经concat的参数数组
            }
        }
    })([])
}

function looseCurry(fn, arity = fn.length) {
    return (function nextCurried(prevArgs) {// prevArgs 是一个数组
        return function curried(...nextArgs) {// nextArgs是数组，可以是多个参数
            let args = prevArgs.concat(nextArgs)
            if (args.length >= arity) {
                return fn(...args) // 当参数个数已经达到原始函数的parameter个数，则执行原先函数，参数是已经收集的所有arguments
            } else {
                return nextCurried(args) // 如果参数个数没有达到所需的个数，则返回下一个函数，接收之前已经concat的参数数组
            }
        }
    })([])
}

module.exports = {
    curry,
    looseCurry
}
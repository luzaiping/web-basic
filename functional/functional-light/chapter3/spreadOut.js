// 将单个数组参数转换成多个单参数
// 适合不能修改已有fn的定义的情况
function spreadArgs(fn) {
    return function spreadFn(arrArgs) {
        return fn(...arrArgs)
    }
}

// 将多个单参数，合成一个单数组参数
function gatherArgs(fn) {
    return function gatherFn(...args) {
        return fn(args)
    }
}
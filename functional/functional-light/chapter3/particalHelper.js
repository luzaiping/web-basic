const reverseArgs = require('./reverseArgsHelper')

function partical(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

// 将前后的参数顺序进行revert，
// 比如 particalRight(test, 1, 2)(3, 4)  等同于 test(3, 4, 1, 2)
function particalRight(fn, ...presetArgs) {
    return reverseArgs(
        partical(reverseArgs(fn), ...presetArgs.reverse())
    )
}

// 将前后的参数顺序都revert
// 比如 particalRight(test, 1, 2)(3, 4)  等同于 test(4, 3, 2, 1)
function particalRightAll(fn, ...presetArgs) {
    return partical(reverseArgs(fn), ...presetArgs)
}


module.exports = {
    partical,
    particalRight,
    particalRightAll
}
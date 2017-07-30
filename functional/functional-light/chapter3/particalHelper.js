const reverseArgs = require('./reverseArgsHelper')

function partical(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

function particalRight(fn, ...presetArgs) {
    return reverseArgs(
        partical(reverseArgs(fn), ...presetArgs.reverse())
    )
}

module.exports = {
    partical,
    particalRight
}
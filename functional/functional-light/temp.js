function reverseArgs(fn) {
    return function argsReverse(...args) {
        return fn(...args.reverse())
    }
}

function partical(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

function paricalRight(fn, ...presetArgs) {
    return reverseArgs(
        partical(reverseArgs(fn), ...presetArgs)
    )
}

function particalAllRight(fn, ...presetArgs) {
    return partical(reverseArgs(fn), ...presetArgs)
}

// curry(test, 3)(1)(2)(3)
function curry(fn, arity=fn.length) {
    return (function nextCurried(presetArgs) {
        return function curried(arg) {
            let args = presetArgs.concat([arg])
            if (args.length >= arity) {
                return fn(...args)
            } else {
                return nextCurried(args)
            }
        }
    })([])
}

function compose(...fns) {
    return function composed(result) {
        let fnList = fns.slice()
        while (fnList.length > 0) {
            result = fnList.pop()(result)
        }
        return result
    }
}

function composeReduce(...fns) {
    return function composed(result) {
        fns.reduceRight((result, fn) => {
            return fn(result)
        }, result)
    }
}

const pipe = reverseArgs(compose)
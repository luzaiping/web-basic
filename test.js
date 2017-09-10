function partical(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

function strictCurry(fn, arity = fn.length) {
    return ( function nextCurried(prevArgs) {
        return function curryed(nextArgs) {
            let args = prevArgs.concat([nextArgs])

            if (args.length >= arity) {
                return fn(...args)
            } else {
                return nextCurried(args)
            }
        } 
    })([])
}

function looseCurry(fn, arity = fn.length) {
    return ( function nextCurried(prevArgs) {
        return function curryed(...nextArgs) {
            let args = prevArgs.concat(nextArgs)

            if (args.length >= arity) {
                return fn(...args)
            } else {
                return nextCurried(args)
            }
        } 
    })([])
}

function sum(...args) {
    let count = 0
    for (let arg of args) {
        count += arg
    }
    return count
}

/* let sumPartical = partical(sum, 1, 2, 3, 4)
let sumCurried = strictCurry(sum, 5)
let looseCurried = looseCurry(sum, 5)

console.log(sumPartical(5, 6, 7))
console.log(sumCurried(1)(2)(3)(4)(5))
console.log(looseCurried(1)(2, 3)(3, 4, 5, 7, 8)) */

let double = value => value * 2
let arr = [1, 2, 3, 4, 5]
console.log(arr.map(double))


function partical(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

function sum(...args) {
    let count = 0
    for (let arg of args) {
        count += arg
    }
    return count
}

function add(x, y) {
    return x + y
}

let particalApply = partical(sum, 1, 2 ,3)
console.log(particalApply(4,5,6))

let arr = [1, 2, 3, 4, 5].map(partical(add, 2))
console.log(arr)

module.exports = {
    partical
}
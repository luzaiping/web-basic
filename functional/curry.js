const multiply = (x, y) => x * y

const curry = fn => x => y => fn(x, y)

const curriedMultiply = curry(multiply)

const double = curriedMultiply(2)
const triple = curriedMultiply(3)
const quadruple = curriedMultiply(4)

console.log(double(2))
console.log(triple(2))
console.log(quadruple(2))
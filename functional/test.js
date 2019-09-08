// composite
const add = (x, y) => x + y
const square = x => x*x

const addThenSquare = (x, y) => square(add(x, y))
const composeTwo = (f, g) => (...args) => f(g(...args))

// partical（将某个函数的某个或某几个参数值固定，再返回一个新函数；这个新函数最终也是调用原函数，只是原函数的某个或某几个参数值已经被新函数确认好）
const multiply = (x, y) => x * y
const particalApply = (fn, x) => y => fn(x, y)

const double = particalApply(multiply, 2)
const triple = particalApply(multiply, 3)
const quadruple = particalApply(multiply, 4)

// curry (将一个函数拆分成多次函数调用，每次函数调用接受原函数的一个参数)
const curry = fn => x => y => fn(x, y)
// const curriedMultiply =  curry(multiply)

// const double2 = curriedMultiply(2)
// const triple2 = curriedMultiply(3)
// const quadruple2 = curriedMultiply(4)

// recursion
const factorial = n =>  {
  if (n === 0) return 1
  return n * factorial(n - 1)
}

// tail call optimisation
const factorialOptimisation = (n, base) => {
  if (n === 0) return base

  base *= n
  return factorialOptimisation(n - 1, base)
}


function id(x) {
  return x; // (A)
}

function f(a) {
  let b = a + 1;
  return id(b); // (B)
}
// console.log(f(2)); // (C)

function partical(fn, ...presetArgs) {
  return function particallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  }
}

function reverseArgs(fn) {
  return function reverse(...args) {
    return fn(...args.reverse())
  }
}

function curry(fn, arity = fn.length) {
  return (function nextCurried(presetArgs) {
    return function(nextArg) {
      let args = presetArgs.concat([nextArg])
      return args.length > arity ? fn(...args) : nextCurried(args)
    }
  }([]))
}

// compose(f, g, h) => f(g(h))
function compose(...fns) {
  return function composed(result) {
    let fnList = [...fns] // copy the arry of functions to new fnList
    while (fnList.length > 0) {
      result = fnList.pop()(result) // 获取最上面那个fn，先执行
    }
    return result
  }
}

function composeReduce(...fns) {
  return function composed(result) {
    return [...fns].reverse().reduce(function reducer(result, fn) {
      return fn(result)
    }, result)
  }
}

var compose = (...fns) => result => [...fns].reverse().reduce((result, fn) => fn(result), result);

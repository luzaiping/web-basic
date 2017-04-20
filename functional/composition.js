const add = (x, y) => x + y
const square = x => x * x

const addThenSquare = (x, y) => square(add(x, y))

const composeTwo = (f, g) => (x, y) => g(f(x, y))

const composeTwoES5 = function (f, g) {
	return function (x, y) {
		return g(f(x, y))
	}
}

const composeTwoAnyArgs = (f, g) => (...args) => g(f(...args)) 

const composeAnyFunsAndAnyArgs = (...args) => {
	const funcs = args;
	return function (...args) {
		funcs.forEach( func => {
			args = [func.apply(this, args)]
		})
		return args[0]
	}
}
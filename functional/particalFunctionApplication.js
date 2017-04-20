const multiply = function (x, y) {
	return x * y
}

const partApply = function (fn, x) {
	return function(y) {
		return fn(x, y)
	}
}

const double = partApply(multiply, 2)
const triple = partApply(multiply, 3)
const quadruple = partApply(multiply, 4)
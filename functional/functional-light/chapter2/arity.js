function testArity(x, y , z) {
    console.log(`testArity.length: ${testArity.length}`)  // the length of paramenter, in this case it will be 3
    console.log(`arguments.length: ${arguments.length}`) // actual argument passed into funciton, it will be different.
}

testArity(1, 2, 3, 4)
testArity(1, 2, 3)
testArity(1, 2)
testArity(1)


function foo(x,y = 2) {
	// ..
}

function bar(x,...args) {
	// ..
}

function baz( {a,b} ) {
	// ..
}

console.log(foo.length)
console.log(bar.length)
console.log(baz.length)

function testDefaultParameterIsRequired(x = require('./require')) {
    console.log(x)
}

testDefaultParameterIsRequired()
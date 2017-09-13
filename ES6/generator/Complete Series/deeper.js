function errorHandling() {
    
    function *foo() {
        try {
            let x = yield 3
            console.log('x:', x)
        } catch (err) {
            console.log('Error: ', err)
        }
    }

    let it = foo()
    console.log(it.next()) // { value: 3, done: false }
    it.throw('Oops!') // send error back in
}

function errorHandling2() {
    function *foo() {
        let x = yield 3
        let y = x.toUpperCase()
        yield y
    }

    try {
        let iter = foo()
        iter.next() // { value: 3, done: false }
        iter.next(42)
    } catch (error) {
        console.error(error)
    }
}

// errorHandling()
// errorHandling2()

function delegate() {
    function *foo() {
        let z = yield 3
        let w = yield 4
        console.log(`z: ${z}, w: ${w}`)
    }

    function *bar() {
        let x = yield 1
        let y = yield 2
        yield *foo()
        let v = yield 5
        console.log(`x: ${x}, y: ${y}, v: ${v}`)
    }

    let iter = bar()
    iter.next() // { value: 1, done: false }
    iter.next('x') // { value: 2, done: false }
    iter.next('y') // { value: 3, done: false }
    iter.next('z') // { value: 4, done: false }
    iter.next('w') // { value: 5, done: false }
    // z: z, w: w
    iter.next('v') // { value: undefined, done: true }
    // x: x, y: y, v: v
}

function delegate2() {
    function *foo() {
        yield 3
        yield 4
    }

    function *bar() {
        yield 1
        yield 2
        yield *foo()
        yield 5
    }

    for (let value of bar()) {
        console.log(value)
    }

    function *gen() {
        yield *['a', 'b', 'c']
    }

    let it = gen()
    console.log(it.next())
}

function delegateWithReturn() {
    function *foo() {
        yield 2
        yield 3
        return 'foo'
    }

    function *bar() {
        yield 1
        let value = yield *foo()
        console.log(`value: ${value}`)
        yield 4
    }

    let iter = bar()
    iter.next() // { value: 1, done: false }
    iter.next() // { value: 2, done: false }
    iter.next() // { value: 3, done: false }
    iter.next() // value: foo , { value: 4, done: false }
    iter.next() // { value: undefined, done: true }
}

function delegateWithError() {
    function *foo() {
        try {
            yield 2
        } catch (error) {
            console.error('foo caught:', error)
        }
        yield 3
        throw 'Oops!'
    }

    function *bar() {
        try {
            yield 1
            yield *foo()
        } catch (error) {
            console.log('bar caught:', error)
        }
    }

    let iter = bar()
    iter.next() // { value: 1, done: false }
    iter.next() // { value: 2, done: false }
    iter.throw('Uh oh!') // error will be caught inside foo() and keep going until next yield with output: { value: 3, done: false }
    iter.next() // { value: undefined, done: true }
}

// delegate()
// delegate2()
// delegateWithReturn()
delegateWithError()
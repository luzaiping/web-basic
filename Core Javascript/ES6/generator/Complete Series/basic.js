function basicSyntax() {
    function *foo() {
        let x = 1 + (yield 1*2) // yield 加上后面的内容 称作 yield 表达式(expression)
        return x // 不要用return，否则for ... of 会得不到返回值
    }
    
    let iter = foo()
    let receivedObj = iter.next()
    console.log(receivedObj)
    let nextReceivedObj = iter.next()
    console.log(nextReceivedObj)
}

// basicSyntax()

function sendInAndSendOut() {

    function *foo(x) {
        let y = 2 * (yield x + 1)
        let z = yield y/3
        return x + y + z
    }

    let iter = foo(5)
    console.log(iter.next()) // {value: 6, done: false}
    console.log(iter.next(12)) // {value: 8, done: false}. The second next(12) resume the generator as if the previous yield expression( yield (x + 1)) return 12
    console.log(iter.next(13)) // {vlaue: 42, done: true}
}

// sendInAndSendOut()

function forOf() {
    function *foo() {
        yield 1
        yield 2
        yield 3
        yield 4
        yield 5
        console.log('1111')
    }

    let it = foo()
    console.log(it.next())
    console.log(it.next())
    console.log(it.next())
    console.log(it.next())
    console.log(it.next())
    console.log(it.next())

    // for (let value of foo()) {
    //     console.log(value)
    // }
}

// forOf()


function* foo(a = 0) {
    let x = a + (yield 1) // line 1
    let y = x + (yield 2) // line 2
    let z = y + (yield 3) // line 3
    console.log(x, y, z) // line 4
}

let iter = foo(1) // line 5
iter.next(2) // line 6
iter.next(3) // line 7
iter.next(4) // line 8
iter.next(5) // line 9

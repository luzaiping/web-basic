function basicSyntax() {
    function *foo() {
        let x = 1 + (yield 1*2) // yield 加上后面的内容 称作 yield 表达式(expression)
        return 3 // 不要用return，否则for ... of 会得不到返回值
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

sendInAndSendOut()

function forOf() {
    function *foo() {
        yield 1
        yield 2
        yield 3
        yield 4
        yield 5
        return 6 // returned value won't loop out.
    }

    for (let value of foo()) {
        console.log(value)
    }
}

// forOf()


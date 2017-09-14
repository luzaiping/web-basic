const config = ['sakya', 'saga', 'Dohko']

function makeAsyncCall(number, callback) {
    setTimeout(function() {
        callback(config[number % 3])
    }, 1000)
}

function simplest() {
    
    function request(number) {
        makeAsyncCall(number, function(response) {
            iter.next(response)
        })
    }
    
    function *main() {
        let result1 = yield request(1)
        console.log(result1)
        
        let result2 = yield request(2)
        console.log(result2)
    
        let result3 = yield request(3)
        console.log(result3)
    }
    
    let iter = main()
    iter.next()
}
// simplest()

function promisePair() {

    function request(number) {
        return new Promise(function(resolve) {
            makeAsyncCall(number, function(response) {
                resolve(response)
            })
        })
    }

    function runGenerator(g) {
        let iter = g();

        (function iterate(val) {
            let { done, value } = iter.next(val)
            if (!done) {
                if (typeof value === 'object' && 'then' in value) {
                    value.then(iterate)
                } else {
                    setTimeout(function() {
                        iter.next(value)
                    }, 1000)
                }
            }
        })()
    }

    runGenerator(function *main() {
        let result1 = yield request(1)
        console.log(result1)
        
        let result2 = yield request(2)
        console.log(result2)
    
        let result3 = yield request(3)
        console.log(result3)

        let result4 = yield 4
        console.log(result4)
    })
}
// promisePair()

function complexity() {

    function request(number) {
        return new Promise(function(resolve) {
            makeAsyncCall(number, function(response) {
                resolve(response)
            })
        })
        .then(function(response) {
            return response === 'sakya' ? request(1) : response
        })
    }

    function runGenerator(g) {
        let iter = g();

        (function iterate(val) {
            let { done, value } = iter.next(val)
            if (!done) {
                if (typeof value === 'object' && 'then' in value) {
                    value.then(iterate)
                } else {
                    setTimeout(function() {
                        iterate(value)
                    }, 1000)
                }
            }
        })()
    }

    runGenerator(function *main() {
        
        let result1 = yield request(1)
        console.log(result1)
        
        let result2 = yield request(2)
        console.log(result2)
    
        let result3 = yield request(3)
        console.log(result3)

        let result4 = yield 4
        console.log(result4)

        let allResults = yield Promise.all([
            request(1),
            request(2)
        ])

        console.log('allResults', allResults)
    })
}

complexity()


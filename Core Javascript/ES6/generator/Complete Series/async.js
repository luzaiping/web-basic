/**
 * 异步请求，最常见就是ajax、fetch网络请求
 * @param {*} url 
 * @param {*} callback 
 */
function makeAsyncCall(url, callback) {
    setTimeout(function() {
        callback( {name: 'Sakya', age: 18} )
        // callback( {}, Error('something wrong is encountered.') )
    }, 1000)
}


function simplestAsync() {
    /**
     * 调用异步请求，在callback里调用generator的next(response)，将response send back into generator
     * @param {*} url 
     */
    function request(url) {
        if (cache[url]) {
            setTimeout(function() { // 这边需要加上setTimeout，因为yiled request()只有在执行完 request() 后，generator 才进入paused state；然后才可以调用 iter.next()
                iter.next(cache[url]) // 如果不加 setTimeout，就会立即调用 iter.next()，就会抛错
            })
        } else {
            makeAsyncCall(url, function(response) {
                iter.next(response)
            })
        }
    }
    
    function *main() {
        let result = yield request('http://www.google.com/')
        console.log(result)
        let result2 = yield request('https://www.google.com.cn')
        console.log(result2)
    }
    
    let cache = {}
    let iter = main()
    iter.next()
}
// simplestAsync()

function promisePair() {
    runGenerator(function *main() {
        try {
            let result = yield request('http://www.google.com/')
            console.log(result)

            let result2 = yield request('https://www.google.com.cn')
            console.log(result2)
    
            let value = yield 3
            console.log(value)
        } catch (error) {
            console.log('Error:', error)
        }
    })

    function request(url) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject( Error('something wrong is encountered.') ) // promise rejection will be mapped to a generator error, equals to iter.throw(error)
            }, 1000)
        })
    }
}

// promisePair()

function runGenerator(g) {
    let iter = g(); // 这边的分号不能省略，否则会跟后面的()连起来，把g()当成function来识别，从而报错

    (function iterate(val) {
        let { value, done } = iter.next(val)

        if (!done) {
            if (typeof value === 'object' && 'then' in value) {
                value.then(iterate)
            } else {
                setTimeout(function() {
                    iterate(value)
                })
            }
        }
    })()
}

function complexity() {

    let config = ['Sakya', 'Saga', 'Dohko']

    function request(number) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(config[number % 3])
            }, 1000)
        })
        .then(function(response) {
            if (/^https?:\/\/.+/.test(response)) {
                return request(response) // next then will wait for this promise settles.
            } else {
                return response
            }
        })
    }

    runGenerator(function *main() {
        let result = yield request(1)
        console.log('search results:', result)
        
        result = yield Promise.all([
            request(1),
            request(2),
            request(3)
        ])
        console.log('all results:', result)
        // var searchResults = yield request('http://some.url.4?search=' + searchTerms.join('+'))

    })
}

complexity()
function BrittlePromise(fn) {

    let callback

    this.then = function(cb) {
        callback = cb
    }

    function resolve(value) {
        setTimeout(function() {
            callback(value)
        }, 0)
    }

    fn(resolve)
}


let promise = new BrittlePromise(function(resolve, reject) {
    // do something async, then resolve or reject
    setTimeout(() => {}, 1)

    let value = 42
    if (true) {
        resolve(value)
    } else {
        reject(Error('something goes wrong'))
    }
})

promise.then(function callback(value) {
    console.log(value)
})

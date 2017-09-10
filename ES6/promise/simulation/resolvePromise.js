function ChaingingPromise(fn) {

    let state = 'pending'
    let value, deferred

    function resolve(newValue) {
        value = newValue
        state = 'resolved'
        deferred && handle(deferred)
    }

    function handle(onResolved) {
        if (state === 'pending') {
            deferred = onResolved
        } else {
            onResolved(value)
        }
    }

    this.then = function(onResolved) {
        handle(onResolved)
    }

    fn(resolve)
}



let promise = new ChaingingPromise(function(resolve, reject) {
    // do something async, then resolve or reject

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


promise.then(function callback(value) {
    console.log(`result: ${value}`)
})

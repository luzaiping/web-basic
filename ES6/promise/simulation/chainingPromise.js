function ChaingingPromise(fn) {

    let state = 'pending'
    let value, deferred = null

    function resolve(newValue) {

        if (newValue && typeof newValue.then === 'function') {
            newValue.then(resolve)
            return
        }

        value = newValue
        state = 'resolved'
        deferred && handle(deferred)
    }

    function handle(handler) {
        if (state === 'pending') {
            deferred = handler
            return
        }

        if(!handler.onResolved) {
            handler.resolve(value)
            return
        }

        let result = handler.onResolved(value)
        handler.resolve(result)
    }

    this.then = function(onResolved) {
        return new ChaingingPromise(function(resolve) {
            handle({
                onResolved: onResolved,
                resolve: resolve
            })
        })
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

promise
    .then(function callback(value) {
        return value + 1
    })
    .then(function callback(value) {
        console.log(value)
    })
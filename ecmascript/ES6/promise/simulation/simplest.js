function doSomething() {
    return {
        then: function(callback) {
            let value = 42
            callback(value)
        }
    }
}

let thenable = doSomething()
thenable.then(function callback(value) {
    console.log(value)
})
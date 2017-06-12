var Ajax = {
    load: function (url, callback) {
        setTimeout(function() {
            let result = 'asyn result'
            callback.call(this, result)
        }, 1000)
    }
}

module.exports = Ajax
var observer = (function () {
    var events = {};
    return {
        subscribe: function (eventName, callbackToAdd) {
            var callbacks = events[eventName];
            if(callbacks) {
                for(var i=0; i<callbacks.length; i++) {
                    if(callbacks[i] === callbackToAdd) return;
                }
                callbacks.push(callbackToAdd);
            } else {
                events[eventName] = [ callbackToAdd ];
            }
        },
        unSubscribe: function (eventName, callbackToRemove) {
            var callbacks = events[eventName];
            if(callbacks) {
                callbacks.forEach(function (callback, index) {
                    if(callback === callbackToRemove) {
                        callbacks.splice(index, 1);
                        return;
                    }
                })
            }
        },
        publish: function (eventName) {
            var callbacks = events[eventName];
            var data = Array.prototype.slice.call(arguments, 1);
            var self = this;
            callbacks && callbacks.forEach(function (callback) {
                callback.apply(self, data);
            })
        }
    };
})();
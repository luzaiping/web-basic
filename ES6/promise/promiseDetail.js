/**
 * Created by Administrator on 2016/12/2.
 */

function PromiseSimulation(fn) {
    var state = 'pending';
    var value;
    var deferred = null;

    function resolve(newValue) {
        if(newValue && typeof newValue.then === 'function') {
            newValue.then(resolve);
            return;
        }
        value = newValue;
        state = 'resolved';
        deferred && handle(deferred);
    }

    function handle(handlerObj) {
        if(state === 'pending') {
            deferred = handlerObj;
            return;
        }

        if(!handlerObj.onResolved) {
            handlerObj.resolve(value);
            return;
        }

        var ret = handlerObj.onResolved(value);
        handlerObj.resolve(ret);
    }

    this.then = function(onResolved) {
        return new PromiseSimulation(function(resolve) {
            handle({
                onResolved: onResolved,
                resolve: resolve
            });
        });
    };

    fn(resolve);
}

var promise = new PromiseSimulation(function (resolve) {
    resolve(50);
});

promise.then(function (firstResult) {
    console.log('first result: ' + firstResult);
    return doSomethingElse(firstResult);
}).then(function (secondResult) {
    console.log('second result: ' + secondResult);
});

function doSomethingElse(value) {
    return new PromiseSimulation(function (resolve) {
        resolve("did something else with " + value);
    });
}
Deferred = function (func) {
    var tuples = [
            ['resolve', 'done', jQuery.Callbacks('once memory'), 'resolved'],
            ['reject', 'fail', jQuery.Callbacks('once memory'), 'rejected'],
            ['notify', 'progress', jQuery.Callbacks('once memory')]
        ],
        state = 'pending',
        deferred = {},
        promise = {
            getState: function() {
                return state;
            },
            always: function() {
                deferred.done(arguments).fail(arguments);
                return this;
            },
            promise: function(obj) {
                return obj !== null ? jQuery.extend(obj, promise) : promise
            },
            then: function() {
                var fns = arguments;
                return new Deferred(function ( newDefer ) {
                    jQuery.each(tuples, function(index, tuple) {
                        var action = tuple[index],
                            fn = fns[index];

                        // add callback to parent callback list
                        deferred[tuple[1]](function() {
                            var returnedValue = fn && fn.apply(this, arguments);
                            if(returnedValue && jQuery.isFunction(returnedValue.promise)) {
                                returnedValue.promise
                                    .done(newDefer.resolve)
                                    .fail(newDefer.reject)
                                    .progress(newDefer.notify);
                            } else {
                                newDefer[action + 'With'](this === promise ? newDefer.promise() : this, fn ? [ returnedValue ] : arguments );
                            }
                        });
                    });
                    fns = null;
                }).promise();

            }
        };

    if( func ) {
        func.call( deferred, deferred );
    }
};


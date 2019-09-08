var Callbacks = function (options) {
    options = options || {};
    var
        memory, // Last fire value (for non-forgettable lists)
        alreadyFired, // Flag to know if list was already fired
        firing, // Flag to know if list is currently firing
        // First callback to fire (used internally by add and fireWith)
        firingStart,
        // End of the loop when firing
        firingLength,
        // Index of currently firing callback (modified by remove if needed)
        firingIndex,
        // Actual callback list
        list = [],
        // Stack of fire calls for repeatable lists
        stack = !options.once && [],
        fire = function ( data ) {
            memory = options.memory && data;
            alreadyFired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            var callbakcResult;
            for( ; list && firingIndex < firingLength; firingIndex++) {
                callbakcResult = list[ firingIndex ].apply(data[0], data[1]);
                if(callbakcResult === false && options.stopOnFalse) {
                    memory = false; // To prevent further calls using add
                    break;
                }
            }
            firing = false;

            if( list ) {
                if( stack ) { // no once
                    if( stack.length ) {
                        fire( stack.shift() );
                    }
                } else if( memory ){
                    list = []; // once and memory, clear list
                } else { // with once but no memory
                    self.disable();
                }
            }
        },
        self = {
            fire: function () {
                self.fireWith(this, arguments);
                return this;
            },
            fireWith: function (context, args) {
                if( !( alreadyFired && options.once ) ) { // for once option
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    firing ? stack.push(args) : fire(args);
                }
                return this;
            },
            add: function () {
                if( list ) {
                    var start = list.length;
                    (function addToList(args) {
                        var length = args && args.length;
                        for(var i=0; i<length; i++) {
                            var callback = args[i];
                            if(typeof callback === "function") {
                                if( !(self.has(callback) && options.unique) ) {
                                    list.push(callback);
                                }
                            } else if(callback && callback.length && typeof callback !== 'string'){ // array
                                addToList(callback);
                            }
                        }
                    })(arguments);

                    if( firing ) {
                        firingLength = list.length;
                    } else if( memory ) {
                        firingStart = start; // put start index equal to list.length, so
                        fire( memory );
                    }
                }
            },
            has: function (fn) {
                return fn ? (list.indexOf(fn) > -1) : !!(list && list.length);
            },
            disable: function () {
                list = stack = memory = false;
                return this;
            }
        };
    return self;
};

var callbacks = Callbacks({ unique: true, once: true, stopOnFalse: true });

var fn1 = function () {
    console.log( 1 );
},
    fn2 = function () {
    console.log( 2 );
},
    fn3 = function () {
    console.log( 3 );
};

callbacks.add( fn1, [ fn2, fn3 ] , fn3);

callbacks.fire();
callbacks.fire();



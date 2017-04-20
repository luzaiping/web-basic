function readFilePromise () {
    let fs = require('fs');

    const readFilePromisified = filename => {
        return new Promise( (resolve, reject) => {
            fs.readFile(filename, { encoding: 'utf8' }, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    };

    let promise = readFilePromisified(process.argv[2]);
    promise.then( data => {
        console.log(data);
    }).catch( error => {
        console.log(error);
    })
}

function delayPromise () {
    function delay (ms) {
        return new Promise( (resolve, reject) => {
            setTimeout(resolve, ms);
        })
    }
    delay(1000).then( () => {
        console.log('1 seconds have passed.');
    });
}

function timeoutPromise () {
    function timeout(ms, promise) {
        return new Promise( function (resolve, reject) {
            promise.then(resolve);
            setTimeout(function () {
                reject(new Error(`Timeout after ${ms} ms.`))
            })
        })
    }
}

// Promise.resolve(x)
function resolvePromiseCreation() {
    // x is a value
    function value() {
        Promise.resolve('abc').then( value => {
            console.log(value);
        });
    }
    // x is a promise
    function promise() {
        const p = new Promise(() => null);
        console.log(Promise.resolve(p) === p);
    }

    // x is thenable, like promise object
    function thenable() {
        const fulfilledThenable = {
            then(reaction) {
                reaction('hello');
            }
        };
        const thenablePromise = Promise.resolve(fulfilledThenable);
        console.log(thenablePromise instanceof Promise);
        thenablePromise.then( x => console.log(x) );
    }

    thenable();
}

// Promise.reject(error)
function rejectPromiseCreation() {
    const myError = new Error('Problem!');
    Promise.reject(myError).catch( error => {
        console.log( error === myError );
    });
}

rejectPromiseCreation();
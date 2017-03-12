/*const iterableObject = {
    [Symbol.iterator]() {
        // iterable body
    }
};
for (const value of iterableObject) {
    console.log(value);
}*/

function asPropertyKeys() {
    const MY_KEY = Symbol();
    const FOO = Symbol();
    const obj = {
        [MY_KEY]: 123,
        [FOO]() {
            return 'bar';
        }
    };
    console.log(obj[MY_KEY], obj[FOO]());
}
// asPropertyKeys();

function enumerateObjectKeys() {
    const obj = {
        [Symbol('myKey')]: 1,
        enum: 2,
        nonEnum: 3
    };
    Object.defineProperty(obj, 'nonEnum', {enumerable: false});

    for( var key in obj) {
        if(obj.hasOwnProperty(key)) { // only enumerable string-valued keys return true
            console.log(`key: ${key}`);
        }
    }

    console.log(Object.getOwnPropertyNames(obj)); // only show string-valued keys: ['enum', 'nonEnum'],
    console.log(Object.getOwnPropertySymbols(obj)); // only show symbol-valued keys: [Symbol('myKey')]
    console.log(Reflect.ownKeys(obj)); // show all keys
    console.log(Object.keys(obj)); // only show enumerable string-valued keys: ['enum']
}

enumerateObjectKeys();
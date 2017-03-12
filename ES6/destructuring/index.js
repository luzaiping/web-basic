/*const arr = ['a', 'b'];

for (const [index, value] of arr.entries()) {
    console.log(index, value);
}*/

/*const map = new Map().set(false, 'no').set(true, 'yes');

for (const [key, value] of map) {
    console.log(`${key} : ${value}`);
}

const [x=3, y] = []; // x=3, y=undefined
const {foo: x=3, bar: y} = {}; // x=3, y=undefined

const [{prop: x} = {}] = []; // two steps destructuring const {prop: x} = {}

const [{prop: x} = {prop: 3}] = [];
const [{age=2, name} = {}] = []; */

/*const findElement = (arr, predicate) => {
    for (const [index, element] of arr.entries() ) {
        if (predicate(element)) {
            return { index, element };
        }
    }
    return { index: -1, element: undefined };
};

const arr = [7, 8, 9];
var { index, element } = findElement(arr, x => (x % 2 === 0));
console.log(` index: ${index}, element: ${element}`);*/

/*
distinguish the following two cases
function move ({x=0, y=0} = {}) {}
function move2 ({x, y} = {x: 0, y: 0}) {}
*/

/*= {} in formal parameter is matched empty actual parameter
function selectEntries ({start = 0, end = -1, step = 0} = {}) {}
selectEntries();
*/

/* null does not trigger pattern match, but undifined does.
const log = console.log.bind(console);
const g = (x = log('x'), y = log('y')) => {
    log('DONE');
};
g(undefined, null);
*/

//y is not defined
/*const refer = (x = y, y = 1) => {};
refer();*/

/*
const QUX = 2;
function bar (callback = () => QUX) {
    const QUX = 3;
    callback();
}
bar();*/

// use rest parameter to replace arguments
/*
function logAllArguments (...args) {
    for (const arg of args) {
        console.log(arg);
    }
}*/

// named parameters
/*function selectEntries ( {start = 0, end = -1, step = 1} = {}) {
 console.log(`start: ${start}, end: ${end}, step: ${step}`);
 }

 selectEntries();
 selectEntries({start: 1});*/

// using function as default value
/*
function mandatory() {
    throw new Error('Missing parameter.');
}
function foo(mustBeProvided = mandatory()) {
    return mustBeProvided;
}*/
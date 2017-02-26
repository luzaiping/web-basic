var myArr = ['Felix', 20, 'something', false];

// old style
// drawback: verbose
/*for(var index = 0; index < myArr.length; index++) {
    console.log(index + " : " + myArr[index]);
}*/

// ES5 style
// drawback: can't return value and can't use break in function body
/*myArr.forEach(function (value, index, myArr) {
    console.log(index + " : " + value);
}, {x: 1});*/

// ES5 for-in style, drawback:
/*1) index is string but not number
2) prototype's property will also be iterated
Array.prototype.name = 'proto';
for(var index in myArr) {
    console.log(index + 1); // 01, 11, 21, 31, but not 1, 2, 3, 4
}*/

// for-in is appropriate for object
/*var obj = {x: 1, y:2, z:3};
for(var key in obj) {
    console.log(key + ' : ' + obj[key]);
}*/

// ES6 for-of on Array
/*for (var value of myArr) {
    console.log(value);
}*/

// ES6 for-of on string
for (var char of 'hello') {
    // console.log(char);
}

// ES6 for-of on like-array data
function test() {
    for (var arg of arguments) {
        // console.log(arg);
    }
}
test(1,2,3,4);

// ES6 for-of on Set
/*var uniqueSet = new Set(myArr.concat([3, 'sandy']));
for (var setEle of uniqueSet) {
    console.log(setEle);
}*/

// under the hood, implement an iterator
class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        var value = this.value;
        if(value < this.stop) {
            this.value++;
            return { done: false, value: value };
        } else {
            return { done: true, value: undefined };
        }
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop); // return iterable object
}

for(var value of range(1, 10)) {
    console.log(value);
}
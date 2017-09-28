/*function* quips (name) {
    yield 'hello ' + name + '!';
    yield 'I hope you are enjoying the blog posts.';
    if( name.startsWith('X')) {
        yield " It's cool how your name starts with X, " + name;
    }
    yield 'see you later!';
}

var iter = quips('X-man'); // return a paused Generator object
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());*/

function* range(start, end) {
    for(var i = start; i < end; i++) {
        yield i;
    }
}

/* console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
 */
/*for(var value of range(0, 3)) {
    console.log(value);
}*/

for (let value of range(0, 3)) {
    console.log(value)
}

let [...arr] = range(0, 3)
console.log(arr)
let zeroForeverIterator = {
    [Symbol.iterator]: function() {
        return this
    },
    next: function() {
        return { done: false, value: 0}
    }
}

for (let value of zeroForeverIterator) {
    console.log(value)
}


/* 
for (VAR of ITERABLE) {
    STATEMENTS
}

var $iterator = ITERABLE[Symbol.iterator]()
var $result = $iterator.next()

while (!$result.done) {
    VAR = $result.value
    STATEMENTS
    $result = $iterator.next()
} 
*/
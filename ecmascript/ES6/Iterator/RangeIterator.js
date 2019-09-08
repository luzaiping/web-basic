
class RangeIterator {
    constructor(start, stop) {
        this.value = start
        this.stop = stop
    }

    [Symbol.iterator]() {
        return this
    }

    next() {
        let value = this.value
        if (value < this.stop) {
            this.value++
            return { done: false, value }
        } else {
            return { done: true, value: undefined }
        }
    }
}

let rangeIterator = new RangeIterator(0, 3)

console.log(rangeIterator.next())

// for (let value of rangeIterator) {
//     console.log(value)
// }

/**
 * Generator 内部实现了 [Symbol.iterator] 和 next 方法， 
 * 即 generator 对象是 Iterable
 * 所以可以通过 for-of 得到对应的值
 * 也可以单步调用 next()
 function *rangeGenerator(start, stop) {
     for (let i = start; i < stop; i++) {
         yield i
        }
    }
    
    let iterator = rangeGenerator(0, 3)
    
    console.log(iterator.next())
*/

// for (let value of rangeGenerator(0, 3)) {
//     console.log(value)
// }
/**
 * 可迭代的数据结构，必须提供一个[Symbol.iterator]的方法
 */
interface Iterable<T> {
    [Symbol.iterator]: Iterator<T>;
}

/**
 * 
 */
interface Iterator<T> {
    next(): IteratorResult<T>;
}

/**
 * 
 */
interface IteratorResult<T> {
    value: T;
    done: boolean
}
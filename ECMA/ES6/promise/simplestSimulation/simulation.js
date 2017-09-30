function Promise2(executor) {
    let self = this
    self.status = 'pending'
    self.data
    
    self.onResolvedCallback = [] // 存放 promise resolve 前，通过 then 注册的 resolve callback
    self.onRejectedCallback = [] // 存放 promise reject 前，通过 then 或 catch 注册的 reject callback

    function resolve(value) {
        if (self.status === 'pending') { // 只处理当前状态是pending的情形
            self.status = 'resolved'
            self.data = value

            for (let i=0; i<self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value)
            }
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected'
            self.data = reason

            for (let i=0; i<self.onRejectedCallback.length; i++) {
                self.onRejectedCallback[i](reason)
            }
        }
    }

    try {
        // 构造一个 Promise 对象时，会先执行 executor，并且传入2个参数：resolve 和 reject
        // 这2个函数，在 exector 里作为 callback 被调用，通常是异步操作后调用
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

let isFunc = fn => typeof fn === 'function'
function emptyFn() {}


Promise2.prototype.then = function (onResolved, onRejected) {
    let self = this
    let returnedPromise

    onResolved = isFunc(onResolved) ? onResolved : emptyFn // If onResolved is not a function, it must be ignored.
    onRejected = isFunc(onRejected) ? onRejected : emptyFn // If onRejected is not a function, it must be ignored.

    if (self.status === 'resolved') {
        returnedPromise = new Promise2(function (resolve, reject) {
            try {
                let resolvedResult = onResolved(self.data) // 执行 executor，executor 调用上一个 promise 对象的 onResolved
                if (resolvedResult instanceof Promise2) { // 如果返回的是一个 promise 对象，则继续执行新 promise 对象的 then，直到返回一个 plain 数据
                    resolvedResult.then(resolve, reject) // 这边是个递归调用，执行下一个 promise 内部的 resolve 或 reject
                }
                resolve(resolvedResult)
            } catch (error) {
                reject(error)
            }
        })
    }

    if (self.status === 'rejected') {
        returnedPromise = new Promise2(function (resolve, reject) {
            try {
                let rejectedResult = onRejected(self.data) // 执行executor，executor 调用上一个 promise 对象的 onResolved
                if (rejectedResult instanceof Promise2) { // 如果返回的是一个 promise 对象，则继续执行 新promise 对象的 then，直到返回一个plain 数据
                    rejectedResult.then(resolve, reject) // 这边是个递归调用
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    if (self.status === 'pending') {
        returnedPromise = new Promise2(function (resolve, reject) {
            self.onResolvedCallback.push(function (value) {
                try {
                    let resolvedResult = onResolved(value)
                    if (resolvedResult instanceof Promise2) {
                        resolvedResult.then(resolve, reject)
                    }
                    resolve(resolvedResult)
                } catch (error) {
                    reject(error)
                }
            })

            self.onRejectedCallback.push(function (reason) {
                try {
                    let rejectedResult = onRejected(reason)
                    if (rejectedResult instanceof Promise2) {
                        rejectedResult.then(resolve, reject)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    return returnedPromise // then 要返回一个 promsie 对象
}

Promise2.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}


let promise = new Promise2(function(resolve) {
    setTimeout(() => {
        resolve(1)
    }, 100)
})

promise.then(function(value) {
    console.log('1111: ', value)
    return value + 1
}, function (reason) {
    console.error(reason)
}).then(function(value) {
    console.log(value)
    return value + 2
}, function (reason) {
    console.error(reason)
})
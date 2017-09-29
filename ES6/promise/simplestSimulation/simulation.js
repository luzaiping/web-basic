function Promise2(executor) {
    let self = this
    self.status = 'pending'
    self.data
    
    self.onResolvedCallback = []
    self.onRejectedCallback = []

    function resolve(value) {
        if (self.status === 'pending') {
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

    onResolved = isFunc(onResolved) ? onResolved : emptyFn
    onRejected = isFunc(onRejected) ? onRejected : emptyFn

    if (self.status === 'resolved') {
        returnedPromise = new Promise2(function (resolve, reject) {
            try {
                let resolvedResult = onResolved(self.data) // 执行executor，executor 调用上一个 promise 对象的 onResolved
                if (resolvedResult instanceof Promise2) { // 如果返回的是一个 promise 对象，则继续执行 新promise 对象的 then，直到返回一个plain 数据
                    resolvedResult.then(resolve, reject) // 这边是个递归调用
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
                } catch (error) {
                    reject(error)
                }
            })

            self.onRjectedCallback.push(function (reason) {
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

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}


let promise = new Promise2(function(resolve, reject) {
    setTimeout(() => {
        resolve(1)
    }, 100)
})

promise.then(function(value) {
    return value + 1
})
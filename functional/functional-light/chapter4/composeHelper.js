function compose(...fn) {
    return function composed(result) {
        let listFn = fn.slice()
        while (listFn.length > 0) {
            result = listFn.pop()(result)
        }
        return result
    }
}

const composeES6 = (...fns) => result => {
    let listFn = fns.slice()
    while (listFn.length > 0) {
        result = listFn.pop()(result)
    }
    return result
}

module.exports = {
    compose,
    composeES6
}
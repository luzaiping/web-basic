function uncurry(fn) {
    return function uncurried(...args) {
        let temp = fn
        for (let arg of args) {
            temp = temp(arg)
        }
        return temp
    }
}
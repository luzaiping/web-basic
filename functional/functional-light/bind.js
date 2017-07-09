function bind(context, targetFn, ...presetArgs) {
    return function(...laterArgs) {
        // return targetFn.apply(context, [...presetArgs, ...postArgs])
        return targetFn.call(context, ...presetArgs, ...laterArgs)
    }
}

let add = (x, y) => x + y
let addBind = bind(null, add)
console.log(addBind(1, 2))
Function.prototype.bindSimulation = function (...args) {
    let targetFn = this //
    let context = args[0]
    let previousArgs = args.slice(1)
    return function(...laterArgs) {
        return targetFn.call(context, ...previousArgs, ...laterArgs)
    }
}

function add(x,y) {
    console.log(x + y)
}

let addBind = add.bindSimulation(null, 1)
addBind(2)

let typeUtils = (function IEEF() {
    let result = {}
    let toString = Object.prototype.toString
    let types = [ 'Number', 'String', 'Boolean', 'Function', 'Array', 'RegExp', 'Date', 'Object' ]

    for( let type of types ) {
        result[ `is${type}` ] = (checkValue) => toString.call(checkValue) === `[object ${type}]`
    }
    return result
})()

module.exports = typeUtils
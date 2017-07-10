
let typeUtils = (function IEEF() {
    const toString = Object.prototype.toString
    let typeArray = ['Object', 'String', 'Number', 'Null', 'Undefined', 'Date', 'Function', 'Array', 'Promise', 'Symbol']
    let result = {}

    for (let type of typeArray) {
        result[`is${type}`] = function(value) {
            return toString.call(value) === `[object ${type}]`
        }
    }
    
    return result
})()
module.exports = typeUtils
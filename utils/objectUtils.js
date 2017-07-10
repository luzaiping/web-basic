
let typeUtils = require('./typeUtils')

function isEmpty(obj) {
    return typeUtils.isObject(obj) && Object.keys(obj).length === 0
}

module.exports = {
    isEmpty
}
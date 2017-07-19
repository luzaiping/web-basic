
let typeUtils = require('./typeUtils')

function isEmpty(obj) {
    return typeUtils.isObject(obj) && Object.keys(obj).length === 0
}

/**
 * 获取指定key的value，如果不存在则返回undefined，这个也可以用来判定object是否包含指定的key
 * @param {*} key 
 */
function getKeyValue(key) {

}

module.exports = {
    isEmpty
}
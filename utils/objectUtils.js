
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

function deepCopy(source, target) {
  var target = target || {}
  for (var key in source) {
    if (typeof source[key] === 'object') {
      target[key] = source[key].constructor === Array ? [] : {}
      deepCopy(source[key], target[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

let source = { name: 'Felix', address: { province: 'fj', city: 'fuzhou' }, companies: [ 'rc', { last: 'nd', title: 'senior' }] }
console.log(deepCopy(source, {age: 30}))

module.exports = {
  isEmpty
}
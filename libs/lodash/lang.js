let _ = require('lodash')

let objs = [{ 'a': 1 }, { 'b': 2 }]
let shallow = _.clone(objs)
console.log(shallow[0] === objs[0])

let deep = _.cloneDeep(objs)
deep[0].a = 10
console.log(objs)
console.log(deep)

console.log(_.conformsTo({a: 1, b: 2}, { b: function(n) {return n > 2}}))

console.log(_.eq(objs, objs))
console.log(_.eq(objs, [{ 'a': 1 }, { 'b': 2 }]))
console.log(_.eq(NaN, NaN))

console.log(_.isBoolean(false))

console.log(_.isEmpty(null))
console.log(_.isEmpty(undefined))
console.log(_.isEmpty({}))
console.log(_.isEmpty([]))
console.log(_.isEmpty(1))
console.log(_.isEmpty(true))

let object = { user: {name: 'Felix', age: 20}, location: 'fj'}
let object2 = { user: {name: 'Felix', age: 20}, location: 'fj'}

console.log(_.isEqual(object, object2)) // deep comparison
console.log(_.eq(object, object2)) // 也比较引用

console.log(_.isFinite(Number.MIN_VALUE))
console.log(_.isFinite(Infinity))
console.log(_.isFinite('d'))

console.log(_.isNil(null))
console.log(_.isNil(undefined))

console.log(_.isObjectLike(undefined))

console.log(_.toArray('abc'))
console.log(_.castArray(1))

let atObject = { 'a': [{ 'b': { 'c': 3 } }, 4] }
console.log(_.at(atObject, ['a[0].b.c'], 'a[1]')) 
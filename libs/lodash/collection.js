let _ = require('lodash')

console.log(_.countBy([6.1, 4.2, 6.3], Math.floor))

console.log(_.every([true, 1, false, null, 'yes'], Boolean))

console.log(_.flatMap([1, 2, [3, [4]], [5]]))
console.log(_.flatMapDeep([1, 2, [3, [4]], [5]]))

_.forEach({name: 'Felix', age: 20}, function (value, key) {
    console.log(`key: ${key}`)
})


console.log(_.groupBy([3.1, 4.1, 3.2], Math.floor))

console.log(_.includes([1,1,3,2,3], 10))

console.log(_.sample([1,2,3,4,5])) // 随机获取数组里的一个元素
console.log(_.sampleSize([1,2,3,4,5], 2)) // 随机获取数组里的两个元素

console.log(_.shuffle([1,2,3,4,5])) // 打乱数组元素的顺序

console.log(_.size([1,2,3]))
console.log(_.size({name: 'Felix'}))
console.log(_.size('Felix'))

let users =  [
    { 'user': 'fred',   'age': 48 },
    { 'user': 'barney', 'age': 36 },
    { 'user': 'fred',   'age': 40 },
    { 'user': 'barney', 'age': 34 }
]

console.log(_.sortBy(users, [function(o) { return o.user}]))
console.log(_.sortBy(users, ['userr', 'age']))

console.log(_.now())
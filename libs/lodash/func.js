let _  = require('lodash')

// after(n, func)

let saves = ['profile', 'settings']

let done = _.after(2, function afterFn() { // after 生成另外一个函数，这个函数执行完2次后，才会执行afterFn；如果实际执行次数少于2，那么 afterFn 不会执行
    console.log('done saving!')
})

_.forEach(saves, () => {
    setTimeout(function() {
        console.log('begin saving')
        done()
    }, 100)
})

let object = {
    user: 'fred',
    greet: function(greeting, punctuation) {
        return greeting + ' ' + this.user + punctuation;
    }
}

let bound = _.bindKey(object, 'greet', 'hi')
console.log(bound('!'))

object.greet = function(greeting, punctuation) {
    return greeting + ' ya ' + this.user + punctuation;
}
console.log(bound('!!!'))

bound = _.bindKey(object, 'greet', _, '?')
console.log(bound('Are u'))

let abc = (a, b, c) => [a, b, c]
let curried = _.curry(abc)
console.log(curried(1)(2)(3))
console.log(curried(1, 2)(3))
console.log(curried(1, 2, 3))
console.log(curried(1, 2, 3))
console.log(curried(1)(_, 3)(4))


let flipped = _.flip(function(...args) { // reverse arguments
    return _.toArray(args)
})

console.log(flipped('a', 'b', 'c', 'd'))


function double(n) {
    return n * 2
}

function square(n) {
    return n * n
}

let func = _.overArgs((x, y) => [x,y], [square, double])
console.log(func(10, 1))


function greet(greeting, name) {
    return `${greeting} ${name}`
}

let sayHelloTo = _.partial(greet, 'hello')
console.log(sayHelloTo('Felix'))

let greetFred = _.partial(greet, _, 'fred')
console.log(greetFred('hi'))

let greetFredRight = _.partialRight(greet, 'fred')
console.log(greetFredRight('hello'))

let sayHelloToRight = _.partialRight(greet, 'hello', _)
console.log(sayHelloToRight('fred'))


/**
 * rest
 */

 let say = _.rest(function(what, names) {
     return what + ' ' + _.initial(names).join(', ') + (_.size(names) > 1 ?  ',&' : '') + _.last(names) 
 })

 console.log(say('hello', 'fred', 'barney', 'pebbles'))


 let numbers = Promise.all([
     Promise.resolve(100),
     Promise.resolve(50),
 ])

 numbers
    .then(_.spread(function(x, y) {
        return x + y
    }))
    .then(value => { console.log(value)})

let test = function(x) {
    return x
}

console.log(_.map(['6', '9', '10'], _.unary(parseInt)))


let p = _.wrap(_.escape, function(func, text) {
    return '<p>' + func(text) + '</p>'
})

console.log(p('fred, barney, & pebbles'))

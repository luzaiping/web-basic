let _ = require('lodash')

function Foo() {
    this.a = 1
    this.b = 2
    this.fnA = _.constant('a')
    this.fnB = _.constant('b')
}

Foo.prototype.c = 3
Foo.prototype.fnC = _.constant('c')

_.forIn(new Foo, function(value, key) {
    console.log(key)
})

_.forOwn(new Foo(), (value, key) => {
    console.log(key)
})

console.log(_.functions(new Foo))
console.log(_.functionsIn(new Foo)) // get inherited enumerable properties also.
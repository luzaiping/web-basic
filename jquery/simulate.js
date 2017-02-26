//
// var aQuery = function (selector, context) {
//     return new aQuery.prototype.init(selector, context);
// };
//
// aQuery.prototype = {
//     init: function (selector, context) { // constructor
//         this[ 0 ] = { getElementById: function () { } };
//         return this;
//     },
//     name: function () {
//         return this.age;
//     },
//     age: 20,
//     constructor: aQuery,
//     addAge: function (num) {
//         this.age += num;
//         return this;
//     },
//     subtract: function (num) {
//         this.age -= num;
//         return this;
//     }
// };
//
// aQuery.prototype.init.prototype = aQuery.prototype;
// var $ = aQuery;
//
// var o = $();
// console.log(o.age);
//
// o.addAge(2).subtract(3);
// console.log(o.age);

var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
var str = '#content';
var match = rquickExpr.exec(str);
console.log(match);



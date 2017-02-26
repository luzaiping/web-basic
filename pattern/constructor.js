/**
 * Created by Administrator on 2016/11/29.
 */

/**
 * simple constructor pattern
 * @param model
 * @param year
 * @param miles
 * @constructor
 */
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

Car.prototype.toString = function() {
    var arr = a+b;
    arr.push();
    return this.model + ' has done ' + this.miles + ' miles';
};

var arr = [];
arr.push();

var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

console.log( civic.toString() );
console.log( mondeo.toString() );

/**
 * simple prototype chain
 * disadvantage: Parent constructor would be called multiple times
 */
function Person() {
    this.hasEye = true;
}
Person.prototype.name = 'person';

var person = new Person();
console.log(person.hasEye, person.name); // one own, one inherit

function Chinese() {}

Chinese.prototype = new Person();

//fix .constructor property, otherwise it would be Person
Chinese.prototype.constructor = Chinese;

var chinese = new Chinese();

console.log(chinese.hasEye, chinese.name); // both inherit

/**
 *  intermediate wrapper constructor
 */
function A() {
    console.log('A.[[Call]] activated');
    this.x = 10;
}
A.prototype.y = 20;

var a = new A();
console.log([a.x, a.y]); // 10 (own), 20 (inherited)

function B() {
    // or simply A.apply(this, arguments)
    B.superproto.constructor.apply(this, arguments);
}

/*
function inherit(child, parent) {
    var F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.superproto = parent.prototype;
    child.prototype.constructor = child;
    return child;
}*/

var inherit = (function() {
    var F = function () {}; // reuse empty function F;
    var arr = [];
    arr.push('ssss');
    return function(child, parent) {
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.superproto = parent.prototype;
        child.prototype.constructor = child;
        return child;
    }
})();

inherit(B, A);
var b = new B();
console.log([b.x, b.y]); // 10 (own), 20 (inherited)




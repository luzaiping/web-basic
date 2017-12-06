/**
 * simple constructor pattern
 * @param model
 * @param year
 * @param miles
 * @constructor
 */

function simpleConstructorPattern() {

    function Car(model, year, miles) {
        this.model = model
        this.year = year
        this.miles = miles
    }

    Car.prototype.toString = function() {
        return this.model + ' has done ' + this.miles + ' miles'
    }

    let civic = new Car( 'Honda Civic', 2009, 20000 )
    let mondeo = new Car( 'Ford Mondeo', 2010, 5000 )

    console.log( civic.toString() )
    console.log( mondeo.toString() )
}

/**
 * simple prototype chain
 * disadvantage: Parent constructor would be called multiple times
 */
function prototypeChain() {

    function Person() {
        this.hasEye = true
    }

    Person.prototype.name = 'person'

    let person = new Person()
    console.log(person.hasEye, person.name) // one own, one inherit

    function Chinese() {}

    Chinese.prototype = person

    //fix .constructor property, otherwise it would be Person
    Chinese.prototype.constructor = Chinese

    let chinese = new Chinese()

    console.log(chinese.hasEye, chinese.name) // both inherit
}

/**
 *  intermediate wrapper constructor
 */

function classicPrototypeChain() {

    function A() {
        console.log('A.[[Call]] activated')
        this.x = 10
    }
    A.prototype.y = 20

    let a = new A()
    console.log([a.x, a.y]) // 10 (own), 20 (inherited)

    function B() {
        // or simply A.apply(this, arguments)
        B.superproto.constructor.apply(this, arguments)
    }

    function inherit(child, parent) {
        let F = function() {}
        F.prototype = parent.prototype
        child.prototype = new F()
        child.superproto = parent.prototype
        child.prototype.constructor = child
        return child
    }

    inherit(B, A)
    let b = new B()
    console.log([b.x, b.y]) // 10 (own), 20 (inherited)
}




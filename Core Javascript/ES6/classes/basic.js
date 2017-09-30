class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString() {
        return `(${this.x}, ${this.y})`    
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }
    toString() {
        return `${super.toString()} in ${this.color}`
    }
}

let cp = new ColorPoint(10, 20, 'green')
console.log(cp.toString())
console.log(cp instanceof ColorPoint)
console.log(cp instanceof Point)
console.log(cp instanceof Object)
console.log(Object.getPrototypeOf(ColorPoint) === Point)
console.log(Object.getPrototypeOf(cp))
console.log('====================')

/* =================  class expression ===================================== */

const MyAnnymousClass = class {

}

const MyClassWithName = class Me {
    getClassName() {
        return Me.name
    }
}
const instance = new MyClassWithName()
console.log(instance.getClassName())
console.log('====================')

/* ===================== three type methods of class ===================*/

class Foo {
    constructor(prop) {
        this.prop = prop
    }

    static staticMethod() {
        return 'classy'
    }

    prototypeMethod() {
        return 'prototypical'
    }
}

const foo = new Foo()
console.log(Foo === Foo.prototype.constructor)
console.log(Foo.staticMethod())
console.log(foo.prototypeMethod())
console.log('====================')

/* ===================== get and set ===================*/
class GetAndSetInClass {
    get prop(){
        return 'getter'
    }
    set prop(value) {
        console.log(`setter: ${value}`)
    }
}

const inst = new GetAndSetInClass()
inst.prop = 123
console.log(inst.prop)
console.log('====================')

/* ===================== The prototype of a subclass is the superclass ===================*/
console.log(Object.getPrototypeOf(ColorPoint) === Point) // true
console.log(Object.getPrototypeOf(ColorPoint) === Function.prototype) // false
console.log(Object.getPrototypeOf(Point) === Function.prototype) // true
console.log(Object.getPrototypeOf(Object) === Function.prototype) // true

/* ===================== private data of class ===================*/
class CountdownPrivateDataButInstanceMethod {
    constructor(counter, action) { // private data
        Object.assign(this, { // but each instance has the common method.
            dec() {
                if(counter < 1) return
                counter--
                if(counter === 0) action()
            }
        })
    }
}

class CountdownPrototypeMethodButNotPrivateData {
    constructor(counter, action) {
        this._counter = counter,
        this._action = action
    }
    dec() {
        if(this._counter < 1) return
        this._counter--
        if(this._counter === 0) this._action()
    }
}
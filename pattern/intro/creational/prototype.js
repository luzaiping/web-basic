/**
 * this pattern is an object-based creational design pattern.
 * we use a sort of a 'skeleton' of existing object to create
 * or instantice new obejcts.
 * 
 * 这个模式对于 js 来说是原生支持。因为 js 是采用 prototype inheritance
 * 而不是经典的 object-oriented inheritance
 */

const car = {
  wheels: 4,
  start() {
    console.log('started')
  },
  stop() {
    console.log('stopped');
  }
}

const myCar = Object.create(car, { owner: { value: 'John' } });
myCar.start()
myCar.stop()
console.log(Object.getPrototypeOf(myCar) === car) // check whether car is prototype of myCar

// https://github.com/fbeline/design-patterns-JS/blob/master/docs.md 的实现方式

function Sheep(name, weight) {
  this.name = name;
  this.weight = weight;
}

Sheep.prototype.clone = function() {
  return new Sheep(this.name, this.weight);
}

const sheep = new Sheep('felix', '50kg');
const cloneSheep = sheep.clone()
console.log(cloneSheep.name, cloneSheep.weight)


// https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s07.html 的实现方式

// 不使用 object.create 实现 prototype
var vehiclePrototype = {
  init: function(carModel) {
    this.model = carModel;
  },
  getModel: function() {
    console.log(`this model of this vehicle is: ${this.model}`)
  }
}

function vehicle(model) {
  function F(){}
  F.prototype = vehiclePrototype;
  let f =  new F();
  f.init(model)
  return f;
}

var car2 = vehicle('Ford Escort')
car2.getModel()

// 不使用 object.create 实现 prototype 的另一种实现方式
var beget = (function() {
  function F() {}
  return function(proto) { // 将 原型 作为参数传递进来
    F.prototype = proto; // 设置构造函数的prototype是proto
    return new F(); // 创建F的对象，新对象就是继承proto对象的方法。这就是基于对象创建新对象的模式
  }
})()

let car3 = beget(vehiclePrototype)
car3.init('Panamera')
car3.getModel()

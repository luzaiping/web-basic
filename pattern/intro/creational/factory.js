/**
 * Factory pattern is class-based creational pattern.
 * We provide a generic interface that delegates the
 * responsibility of object instantiation to its subclasses.
 * 
 * This is pattern is frequently used when need to manage or
 * manipulate collections of objects that are different yet have
 * many similar characteristics
 */

 class BallFactory {
  constructor() {
    this.createBall = function(type) {
      let ball;

      // 根据type决定要创建什么类型的对象, 具体创建是交由子类去实现
      if (type === 'football' || type === 'soccer') ball = new Football()
      else if (type === 'basketball') ball = new Basketball()

      // 创建对象的共有方法 或者 属性
      ball.roll = function() {
        console.log(`Ths ${this.type} is rolling.`)
      }
      return ball;
    }
  }
}

// 具体产品 - 被委托的类型
class Football {
  constructor() {
    this.type = 'football';
    this.kick = function() {
      console.log('You kicked the football.')
    }
  }
}

// 具体产品 - 被委托的类型
class Basketball {
  constructor() {
    this.type = 'basketball';
    this.bounce = function() {
      console.log('You kicked the basketball.')
    }
  }
}

const factory = new BallFactory()

const myFootball = factory.createBall('football');
const myBasketball = factory.createBall('basketball')

myFootball.roll()
myFootball.kick()
myBasketball.roll()
myBasketball.bounce()


// another variant
class BmwFactory {
  static create(type) {
    if (type === 'x5') return new Bmw(type, 108000, 300);
    if (type === 'x6') return new Bmw(type, 111000, 320);
  }
}

class Bmw {
  constructor(model, price, maxSpeed) {
    this.model = model;
    this.price = price;
    this.maxSpeed = maxSpeed;
  }

  getDetail() {
    console.log(`Bmw-${this.model} is sell $${this.price} and speed up to ${this.maxSpeed}`)
  }
}

const Bmwx5 = BmwFactory.create('x5')
const Bmwx6 = BmwFactory.create('x6')

Bmwx5.getDetail()
Bmwx6.getDetail()


// 

let factory = {
  create(type) {
    if (type === 1) {
      return new ProductA()
    } else {
      return new ProductB()
    }
  }
}
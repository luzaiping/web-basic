/**
 * behavioural design pattern that allows an object to alter its behaviour based on
 * change to its internal state.
 * 主要解决： 对象的行为依赖于它的状态，并且可以根据它的状态改变而改变它的相关行为
 * 何时使用： 对象中包含大量与对象状态有关的条件语句。
 */

class TrafficLight {
  constructor() {
    this.states = [new GreenLight(), new YellowLight(), new RedLight()];
    this.currentState = this.states[0]
  }
  change() {
    const totalSize = this.states.length;
    let currentIndex = this.states.findIndex(item => item === this.currentState)
    if (currentIndex + 1 < totalSize) this.currentState = this.states[currentIndex + 1]
    else this.currentState = this.states[0]
  }
  sign() {
    console.log(this.currentState.sign())
  }
}

class Light {
  constructor(light) {
    this.light = light
  }
}

class RedLight extends Light {
  constructor() {
    super('RED')
  }

  sign() {
    return 'STOP'
  }
}

class GreenLight extends Light {
  constructor() {
    super('Green')
  }

  sign() {
    return 'GO'
  }
}

class YellowLight extends Light {
  constructor() {
    super('yellow')
  }

  sign() {
    return 'STEADY'
  }
}

let trafficLight = new TrafficLight()
trafficLight.sign()
trafficLight.change()
trafficLight.sign()
trafficLight.change()
trafficLight.sign()
trafficLight.change()
trafficLight.sign()

// https://github.com/fbeline/design-patterns-JS/blob/master/docs.md#state
function Order() {
  this.state = new WaitForPayment();
  this.nextState = function() {
    this.state = this.state.next(); // 这边实现状态切换
  }
}

function WaitForPayment() {
  this.name = 'waitForPayment';
  this.next = function() {
    return new Shipping();
  }
}

function Shipping() {
  this.name = 'shipping';
  this.next = function() {
    return new Delivered();
  }
}

function Delivered() {
  this.name = 'delivered';
  this.next = function() {
    return this;
  }
}
/**
 * behavioural design pattern is based on defining the skeleton of the algorithm 
 * or implementation of an operation, but deferring some steps to subclass.
 * 
 * 模板方法模式定义了一个算法的步骤，并允许子类别为一个或多个步骤提供其实现方式。
 * 让子类别在不改变算法架构的情况下，重新定义算法中的某些步骤。
 */

class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  work() {
    return `${this.name} handles ${this.responsibilities()}`
  }

  getPaid() {
    return `${this.name} get paid ${this.salary}`
  }
}

class Developer extends Employee {
  constructor(name, salary) {
    super(name, salary)
  }
  responsibilities() {
    return 'application development'
  }
}

class Tester extends Employee {
  constructor(name, salary) {
    super(name, salary)
  }
  responsibilities() {
    return 'testing'
  }
}

const dev = new Developer('Nathan', 10000)
const tester = new Tester('Brian', 9000)

console.log(dev.work())
console.log(tester.work())

// https://github.com/fbeline/design-patterns-JS/blob/master/docs.md
function Tax() {}
Tax.prototype.cal = function(value) { // 这是一个模板方法
  let result = value;
  if (value >= 1000) result = this.overThousand(value)

  return result + 10;
}

function Tax1() {}
Tax1.prototype = Object.create(Tax.prototype); // 这边实现基于 prototype 的继承
Tax1.prototype.overThousand = function(value) { // 子类实现具体的方法
  return value * 1.1;
}

function Tax2() {}
Tax2.prototype = Object.create(Tax.prototype); // 这边实现基于 prototype 的继承
Tax.prototype.overThousand = function(value) { // 子类实现具体的方法
  return value * 1.2;
}

let tax1 = new Tax1()
let tax2 = new Tax2()

console.log(tax1.cal(999))
console.log(tax2.cal(1001))
/**
 * only on instance of a class can exist.
 * if no instance of singleton class exists then
 * a new instance is created and returned. otherwise
 * return Singleton.instance
 */

class Database {
  constructor(data) {
    if (Database.exists) {
      return Database.instance;
    }

    this._data = data;
    Database.instance = this;
    Database.exists = true;
    return this;
  }

  getData() {
    return this._data;
  }

  setData(data) {
    this._data = data
  }
}

const mongo = new Database('mongo');
console.log(mongo.getData())

const mysql = new Database('mysql');
console.log(mysql.getData())

// https://github.com/fbeline/design-patterns-JS/blob/master/docs.md

// function 实现方式
function Person() {
  if (typeof Person.instance === 'object') return Person.instance;

  Person.instance = this; // 将新创建的对象赋值给 Person.instance
  // return this; // 这句可以不用，constructor 如果没有显示返回，就返回this对象
}

let p1 = new Person();
let p2 = new Person()

console.log(p1 === p2)

class PersonClass {
  constructor() {
    if (typeof PersonClass.instance === 'object') return PersonClass.instance;

    PersonClass.instance = this;
    // return this;
  }
}

let pc1 = new Person();
let pc2 = new Person()

console.log(pc1 === pc2)

// https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s04.html

var mySingleton = (function() {
  let instance

  function init() {
    function privateMethod() {}

    return {
      publicProperty: 'I am so public.',
      publicMethod: function() {
        privateMethod(); // call priviate method
        console.log('The public can see me.')
      }
    }
  }

  return {
    getInstance: function() { // 这个就是 singleton 方法
      if(!instance) instance = init()
      return instance;
    }
  }
})()
function Parent (name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log(this.name)
}

function Child(name, parentName) {
  Parent.call(this, parentName);
  this.name = name;
}

function create(proto) {
  function F(){}
  F.prototype = proto;
  return new F();
}

Child.prototype = create(Parent.prototype)
Child.prototype.constructor = Child
Child.prototype.sayName = function() {
  console.log('child name: ', this.name)
}

let parent = new Parent('father')
let child = new Child('son')

parent.sayName()
child.sayName()
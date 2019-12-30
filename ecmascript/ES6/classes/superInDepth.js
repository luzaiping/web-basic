const person = {
  getGreeting() {
    return 'Hello';
  }
};

const friend = {
  getGreeting() {
    return Object.getPrototypeOf(this).getGreeting.call(this) + ', hi!';
  }
};

Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting());
console.log(Object.getPrototypeOf(friend) === person);
console.log(Object.is(Object.getPrototypeOf(friend), person));

const friendWithSuper = {
  getGreeting() {
    // 1. super.getGreeting() 相当于 Object.getPrototypeOf(this).call(this)
    return super.getGreeting() + ', hi with super!';
  },

  /* getGreetingWrong: function() {
    return super.getGreeting + ', throw error!'; // 2. super 只能在简写的方法里使用
  } */
}

Object.setPrototypeOf(friendWithSuper, person);
console.log(friendWithSuper.getGreeting());
console.log(Object.getPrototypeOf(friendWithSuper) === person);
console.log(Object.is(Object.getPrototypeOf(friendWithSuper), person));
// friendWithSuper.getGreetingWrong();

const relative = Object.create(friend);
console.log(person.getGreeting()); // Hello
console.log(friend.getGreeting()); // Hello, hi!

// 3. 使用 Object.getPrototypeOf(this)，当涉及多层继承时，会导致递归调用，从而异常：
// realative.getGreeting(), 会调用 friend.getGreeting(), 这时候 Object.getPrototypeOf(this).getGreeting.call(this) 里的 this 是 realative 对象
// 也就是 Object.getPrototypeOf(this) 是 friend 对象，所以 friend.getGreeting() 里会执行 friend.getGreeting.call(realative)，导致递归调用
console.log(relative.getGreeting()); // error!,

const relative2 = Object.create(friendWithSuper);
console.log(person.getGreeting()); // Hello
console.log(friendWithSuper.getGreeting()); // Hello, hi with super!
// 3. 这种情况是ok，因为 super 引用是固定，不会因为调用方式不同而发生变化，也就是 friend.getGreeting 里的 super.getGreeting() 总是指向 person.getGreeting
console.log(relative2.getGreeting()); // // Hello, hi with super!


/************************ [[HomeObject]] ************************************/
const animal = {
  getGreeting() {
    return 'mu mu mu ....';
  }
}

const dog = {
  // 4. 对象中的方法，都具有一个 [[HomeObject]] 内部属性，这个指向它所在的对象，这边就是指向 dog 这个对象
  // 如果是函数(不是定义成对象属性的函数)，是没有 [[HomeObject]] 属性。
  // 任何对 super 的引用，都会使用 [[HomeObject]]:
  // 第一步：在 [[HomeObject]] 上调用 Object.getPrototypeOf() 来获取对原型的引用。 dog -> animal
  // 第二步：在该原型上查找对应的函数，animal.getGreeting
  // 第三步：最终创建 this 绑定，并调用该方法 animal.getGreeting
  // dog.getGreeting() 的 [[HomeObject]] 值是 dog, 并且 dog 的原型是 animal，因此 super.getGreeting()
  // 等价于 animal.getGreeting().call(this)
  getGreeting() {
    return super.getGreeting() + ', wang wang';
  }
}

Object.setPrototypeOf(dog, animal);
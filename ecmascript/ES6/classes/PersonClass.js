const PersonClass = class PersonClass {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
};

// 下面这个 ES5 的想法等同于上面 ES6 class 写法
// ES6 class 写法有几个约束
// 1. class declarations 不像 function declations，是不会被提升 ( FD 可以定义在使用之前， CD 不可以)
// 6. 在 class 内部，覆盖 class name 会报错，因为这个 class name 已经在IIFE里被定义成 const，而在外部是用 let 定义，是可以被覆盖
let PersonClass2 = (function() {
  'use strict'; // 2. class 中的代码默认就是使用 use strict, 而且不可更改

  const PersonClass2 = function(name) {
    if (typeof new.target === 'undefined') {
      // 5. 调用 class constructor 必须使用 new, 否则会报错
      throw new Error('Constructor must be called with new.');
    }
    this.name = name;
  };

  Object.defineProperty(PersonClass2.prototype, 'sayName', {
    value: function() {
      if (typeof new.target !== 'undefined') {
        // 4. 所有原型方法内部都缺少 [[Construct]] 方法，如果对原型方法调用 new 会报错
        throw new Error('Method cannot be called with new.');
      }

      console.log(this.name);
    },
    enumerable: false, // 3. 所有原型方法都是 non-enumerable
    writable: true,
    configurable: true
  });

  return PersonClass2;
})();

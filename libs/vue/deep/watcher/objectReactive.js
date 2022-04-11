/* eslint-disable max-classes-per-file */
/* eslint-disable no-param-reassign */
const bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return null;
  }
  const segments = path.split('.');
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return null;
      obj = obj[segments[i]];
    }
    return obj;
  };
}

// 这个class什么时候被初始化和调用？
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    window.target = this;
    // 调用 getter 获取指定 expOrFn 对应的值，这个会执行 defineReactive 的 get 方法
    // 将 window.target 作为依赖加入到 subs
    const value = this.getter.call(this.vm, this.vm);
    window.target = null;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

function remove(arr, item) {
  if (arr.length > 0) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
  return arr;
}

class Dep {
  constructor() {
    this.subs = []; // 用于收集依赖
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    // 将 window.target 作为依赖添加到依赖列表里
    // window.target 在 Watcher 的 get 方法里进行赋值，值等于 watcher 实例
    if (window.target) {
      this.addSub(window.target);
    }
  }

  notify() {
    this.subs.forEach(sub => {
      if (sub.update) {
        sub.update();
      }
    });
  }
}

function defineReactive(data, key, value) {
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('== get ==');
      dep.depend(); // 在读取数据时收集依赖
      return value;
    },
    set(newValue) {
      console.log('== set ==');
      if (value === newValue) {
        return;
      }
      value = newValue;
      dep.notify(); // 数据发生变更时，通知依赖
    }
  });
}

// const obj = { name: 'Felix' };
// const obj = {};
// defineReactive(obj, 'name', 'Felix');

// console.log(obj.name);

// obj.name = 'Trump';

// console.log(obj.name);

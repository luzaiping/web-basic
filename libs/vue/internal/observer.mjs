/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */

import Dep from './dep.mjs';

export default class Observer {
  constructor(data) {
    this.observe(data);
  }

  observe(data) {
    if (data && typeof data === 'object') {
      // 是对象类型才做处理
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }

  defineReactive(data, key, value) {
    const self = this;
    this.observe(value); // 递归处理 value

    // 给当前 key 创建一个 dep，用于添加 watcher 和 通知 watcher
    // data 中每一个 key 都会有一个 dep
    const dep = new Dep();

    // 定义数据劫持
    Object.defineProperty(data, key, {
      configurable: false,
      enumerable: true,
      get() {
        // 订阅数据的时候，往 Dep 中添加观察者
        if (Dep.target) {
          console.log(`key: ${key} 添加 watcher`);
          dep.addSub(Dep.target);
        }
        return value;
      },
      set(newVal) {
        console.log(`key: ${key} 发生变化，触发 notify 执行 update`);
        self.observe(newVal); // 设置新值之前先进行数据劫持，以访直接更新值，导致 newVal 没有 getter 和 setter 方法
        if (newVal !== value) {
          value = newVal; // 这边不能写成 data[key] = newVal; 会导致 maximum call stack
        }
        // 让 dep 通知各个观察者执行更新操作
        dep.notify();
      }
    });
  }
}

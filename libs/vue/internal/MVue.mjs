/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-new */
import Compiler from './compiler.mjs';
import Observer from './observer.mjs';

export default class MVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    this.init();
  }

  init() {
    // 1. 实现一个 Observer
    new Observer(this.$data);

    // 2. 实现一个模板解析器
    new Compiler(this.$el, this);

    // 3. 代理 this.$data
    this.proxyData(this.$data);
  }

  proxyData(data) {
    for (const key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newVal) {
          data[key] = newVal;
        }
      });
    }
  }
}

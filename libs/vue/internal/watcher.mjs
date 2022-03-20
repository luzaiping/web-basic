/* eslint-disable import/extensions */
import Dep from './dep.mjs';
import { getExpressionValue } from './utils.mjs';

export default class Watcher {
  constructor(vm, expression, callback) {
    this.vm = vm;
    this.expression = expression;
    this.callback = callback;
    this.oldVal = null;
    this.init();
  }

  /**
   * 将当前 watcher instance 存放在 Dep.target 中，之后调用 getCurrentVal 获取当前 expression 所对应的值
   * getCurrentVal 会遍历 vue instance 的 data 找到对应的值，在这个过程中会访问到 data 中每一个 key (包括嵌套)
   * 的 getter 方法； observer 在 key 的 getter 方法中通过 dep.addSub(Dep.target) 将 watcher 加到 deps
   * 之后需要将 Dep.target 设置为 null，这样才不会导致每运行一次 getter 就添加一次 watcher
   * 这种实现方式过于隐蔽，可以将 dep.addSub 实现为 Set 类型，重复的 watcher 只能被添加一次
   *-----------------------------------------------------------------------------------------------------
   * updater (textUpdater / htmlUpdater / onUpdater) -> new watcher() -> getVal() -> setVal() -> dep.notify() -> watcher.update() -> updater.callback
   * 一个 expression (比如 person.name) 创建一个 watcher； person 和 name 作为两个 key，在定义 key 的 getter 方法时，
   * 创建各自的 dep，同时调用 dep.addSub() 添加 watcher，这时候的 watcher 是通过 Dep.target 引用，因此同一个 expression
   * 中的每一个 key 会有自己的 Dep 实例，但是 Dep 中的 watcher 是一样，之后调用 dep.notify() 触发 watcher.update() 将
   * 新值传递给 updater 的 callback，完成 model -> view 的更新
   */
  init() {
    console.log(`express: ${this.expression} 的 watcher 开始初始化`);
    Dep.target = this;
    this.oldVal = this.getCurrentVal(); // 构造 watcher 的时候，将旧值保存起来
    console.log(
      `express: ${this.expression} 的 watcher 获取旧值后将 Dep.target 设置为null`
    );
    Dep.target = null;
  }

  getCurrentVal() {
    return getExpressionValue(this.expression, this.vm);
  }

  /**
   * 判断新旧值是否有变化，有变化就更新 view
   */
  update() {
    const newVal = this.getCurrentVal();
    if (newVal !== this.oldVal) {
      this.callback(newVal);
    }
  }
}

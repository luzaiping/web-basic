export default class Dep {
  constructor() {
    this.subs = [];
  }

  // 通知观察者执行更新
  notify() {
    console.log('所有 watcher ', this.subs);
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }

  // 添加观察者
  addSub(watcher) {
    this.subs.push(watcher);
  }
}

// stack 的 weakmap 写法
// 将类属性定义成 webkmap 类型，可以将属性变成私有属性，即外部无法修改
// 但是，但是，读取和设置 weakmap 实例可就麻烦多了

const _count = new WeakMap();
const _items = new WeakMap();

export default class StackWeakMap<T> {
  constructor() {
    _count.set(this, 0);
    _items.set(this, {});
  }

  push(element: T) {
    const items = _items.get(this);
    const count = _count.get(this);
    items[count] = element; // 直接修改引用值
    _count.set(this, count + 1); // 重新设置引用值
  }

  // LIFO: 后进先出，所以应该
  pop() {
    // if (this.isEmpty()) return undefined;
    // this.count--;
    // const value = this.items[this.count];
    // delete this.items[this.count];
    // return value;
  }

  // 返回栈顶元素，需判断当前栈是否为空
  peek() {
    if (this.isEmpty()) return undefined;
    const items = _items.get(this);
    return items[this.size() - 1];
  }

  isEmpty() {
    return this.size() === 0;
    // const count = this.get
    // return this.count === 0;
  }

  size() {
    return _count.get(this);
  }

  clear() {
    // this.items = {};
    // this.count = 0;
  }

  // toArray() {
  //   return Object.keys(this.items).map(key => this.items[key]);
  // }

  // toString() {
  //   if (this.isEmpty()) return '';
  //   let str = `${this.items[0]}`;
  //   for (let i = 1; i < this.count; i++) {
  //     str = `${str}, ${this.items[i]}`;
  //   }
  //   return str;
  // }
}

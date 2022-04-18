// 使用 object 类型实现栈数据结构

export default class Stack<T> {
  private items: any;
  private count: number;

  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  // LIFO: 后进先出，所以应该
  pop() {
    if (this.isEmpty()) return undefined;
    this.count--;
    const value = this.items[this.count];
    delete this.items[this.count];
    return value;
  }

  // 返回栈顶元素，需判断当前栈是否为空
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }

  // toArray() {
  //   return Object.keys(this.items).map(key => this.items[key])
  // }

  // toString() {
  //   if (this.isEmpty()) return '';
  //   let str = `${this.items[0]}`;
  //   for (let i = 1; i < this.count; i++) {
  //     str = `${str}, ${this.items[i]}`;
  //   }
  //   return str;
  // }
};

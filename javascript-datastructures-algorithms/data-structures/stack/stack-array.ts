export default class StackArray<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(element: T) {
    this.items.push(element);
  }

  // LIFO: 后进先出，所以应该
  pop() {
    return this.items.pop();
  }

  // 返回栈顶元素，需判断当前栈是否为空
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[length - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  toArray() {
    return this.items;
  }

  toString() {
    return this.items.toString();
  }
}
export default class Stack {
  constructor() {
    this.items = [];
  }

  // add a new item (or serveal items) to the top of the stack.
  push(item) {
    // add item to top of stack
    this.items.push(item);
  }

  // remove the top item from the stack. also return the removed element.
  pop() {
    return this.items.pop();
  }

  // this returns the top element from the stack.
  // the stack is not modified
  // (it does not remove the element, it only returns the element for information purposes)
  peek() {
    return this.items[this.items.length - 1];
  }

  // this returns true if the stack does not contain any elements
  isEmpty() {
    return this.items.length === 0;
  }

  // this removes all the elements of the stack
  clear() {
    this.items = [];
  }

  // this returns how many elements of the stack.
  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items.toString());
  }
}

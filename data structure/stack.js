class Stack {
  constructor() {
    this.items = []; // Array is used to implement a Stack
  }

  push(item) {
    this.items.push(item); // push element into the items
  }

  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop(); //
  }

  // return the first element of stack, but not delete it
  peek() {
    if (this.isEmpty()) return "No elements in Stack";
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printStack() {
    return this.items.join(" ");
  }
}

var stack = new Stack();
console.log(stack.isEmpty());
console.log(stack.pop());
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.printStack());
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.printStack());

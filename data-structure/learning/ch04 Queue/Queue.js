class Queue {
  constructor() {
    this.items = [];
  }

  // add new items at the back of queue.
  enqueue(item) {
    this.items.push(item);
  }

  // this removes the first item of the queue
  // and returns the removed item.
  dequeue() {
    return this.items.shift();
  }

  // this returns the first item of the queue.
  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items.toString());
  }
}

module.exports = Queue;

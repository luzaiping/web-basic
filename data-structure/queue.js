class Queue {
  constructor() {
    this.items = []; // Array is used to implement a Queue.
  }

  enqueue(item) {
    // adding element to the queue
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) return 'Underflow';
    return this.items.shift(); // remove an element from the front of a queue.
  }

  // return the first element of the queue
  front() {
    if (this.isEmpty()) return 'No elements in Queue';
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printQueue() {
    return this.items.join(' ')
  }
}

let queue = new Queue()

console.log(queue.dequeue())
console.log(queue.isEmpty())
queue.enqueue(10); 
queue.enqueue(20); 
queue.enqueue(30); 
queue.enqueue(40); 
queue.enqueue(50); 
queue.enqueue(60); 
console.log(queue.front());
console.log(queue.printQueue()); 
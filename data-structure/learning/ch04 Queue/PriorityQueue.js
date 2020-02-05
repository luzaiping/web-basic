function QueueElement(elem, priority) {
  if (typeof new.target !== 'undefined') {
    this.element = elem;
    this.priority = priority;
  } else {
    throw new Error('You must use new with QueueElement');
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  // 根据 priority，将 element 加到对应的位置上，这是优先队列的一种实现方式
  // 还有一种实现方式，是 dequeue 的时候，根据 priority 进行删除
  enqueue(element, priority) {
    const toAddItem = new QueueElement(element, priority);
    if (this.isEmpty()) {
      this.items.push(toAddItem);
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i += 1) {
        if (toAddItem.priority < this.items[i].priority) {
          this.items.splice(i, 0, toAddItem);
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(toAddItem);
      }
    }
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

module.exports = PriorityQueue;

function Node(element) {
  if (typeof new.target !== 'undefined') {
    this.element = element;
    this.next = null;
    this.prev = null;
  } else {
    throw new Error('You must use new with Node');
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  insert(position, element) {
    const node = new Node(element);

    if (position >= 0 && position < this.length) {
      let current = this.head;
      let previous;
      let index = 0;

      if (position === 0) {
        // 添加到头部
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.head = node;
        }
      } else if (position === this.length) {
        // 添加到尾部，需要 current 指向 this.tail
        current = this.tail;
        node.prev = current;
        current.next = node;
        this.tail = node;
      } else {
        // 其他位置
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
        node.prev = previous;
        current.prev = node;
      }
      return true;
    }
    return false;
  }

  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.head; // current 指向要被删除的节点

      // 删除第一个元素
      if (position === 0) {
        this.head = current.next; // 将head设置为 current.next

        // 如果只有1个元素
        if (this.length === 1) {
          this.tail = null; // 将尾元素设置为 null
        } else {
          // 如果长度大于 1，则不用动尾元素，只需将新 head 的 prev 设置为 null
          this.head.prev = null;
        }
      } else if (position === this.length - 1) {
        // 删除尾部元素
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      } else {
        let previous = null;
        let index = 0;

        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        previous.next = current.next;
        current.next.prev = previous;
      }

      this.length--;
      return current;
    }
    return null;
  }
}

module.exports = DoublyLinkedList;

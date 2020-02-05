function Node(element) {
  if (typeof new.target !== 'undefined') {
    this.element = element;
    this.next = null;
  } else {
    throw new Error('You should use new to call');
  }
}

class LinkedList {
  constructor() {
    this.head = null; // 空链表，head 必须是 null
    this.length = 0;
  }

  /**
   * 添加指定元素到链表的最后面
   * @param {*} element
   */
  append(element) {
    const newItem = new Node(element);

    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newItem;
    } else {
      this.head = newItem;
    }
    this.length++;
  }

  /**
   * 删除指定位置的元素
   * @param {Number} position 要删除的元素位置
   */
  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.head; // current refer to element to remove. default to head

      // 如果是删除第一个元素，则直接设置新的 head 为 current.next
      if (position === 0) {
        this.head = current.next;
      } else {
        let previous = null;
        let index = 0;

        // 往下递归元素
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next; // 找到之后让前一个元素的 next 执行目标元素的 next，完成对 目标元素 的删除
      }
      this.length--;
      return current;
    }
    return null;
  }

  /**
   * 在指定位置插入元素
   * @param {Number} position 要插入元素的位置
   * @param {*} element 元素值
   */
  insert(position, element) {
    if (position > -1 && position < this.length) {
      const node = new Node(element);
      let current = this.head; // 当前迭代位置对应的元素

      // 插入到头部，将 this.head 设置为 insertedElem
      // 将 insertedElem.next 指向前一个元素
      if (position === 0) {
        this.head = node;
        node.next = current;
      } else {
        // 找到目标 position，将目标 position 对应元素的 next 指向 insertedElem
        // 将 insertedElem.next 指向 目标 position 的 next
        let index = 0;
        let previous; // 需要这个变量来引用迭代位置的前一个元素
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      this.length++;
      return true;
    }
    return false;
  }

  toString() {
    let current = this.head;
    const arr = [];
    while (current) {
      arr.push(current.element);
      current = current.next;
    }
    return arr.length > 0 ? arr.join(',') : '';
  }

  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.element === element) return index;
      index++;
      current = current.next;
    }

    return -1;
  }

  /**
   * 删除指定元素，结合 indexOf 和 removeAt 进行删除
   * @param {*} element
   */
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }
}

module.exports = LinkedList;

class Node {
  constructor(data) {
    this.data = data; // node的数据
    this.next = null; // 指向下一个node的指针
  }
}

class LinkedList {
  constructor() {
    this.head = null; // head node
    this.size = 0;
  }

  // add an data at the end of list
  add(data) {
    let node = new Node(data);
    let current;
    if (this.head === null) { // linkedlist is empty
      this.head = node; // set new node as head.
    } else {
      current = this.head; // set loop location from head
      while(current.next) {
        current = current.next;
      }
      current.next = node
    }
    this.size++;
  }

  // 在指定 index 位置插入 data
  insertAt(data, index) {

  }

  removeFrom(location) {

  }

  removeElement(element) {

  }

  isEmpty() {

  }

  size() {

  }

  printList() {

  }


}
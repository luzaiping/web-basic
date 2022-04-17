/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// 链表

class SingleNode {
  // value;
  // next;
  constructor(value) {
    this.value = value;
  }

  setNext(next) {
    this.next = next;
  }
}

// 单链表反转
function reverseLinkedList(head) {
  let next = null;
  let pre = null;

  while (head) {
    next = head.next; // 先记录下一个位置
    head.next = pre; // 下一个指向前一个，实现反转
    pre = head; // 当前的变成是前一个
    head = next; // head 移动到下一个，继续处理下一个节点
  }

  return pre;
}

// 双链表反转
function reverseDoubleLinkedList(head) {
  let next = null;
  let pre = null;

  while (head) {
    next = head.next; // 先记录下一个位置
    head.next = pre; // 下一个指向前一个，实现反转
    head.last = next; // 比单链表多一步 last 指向的调整
    pre = head; // 当前的变成是前一个
    head = next; // head 移动到下一个，继续处理下一个节点
  }

  return pre;
}

function main() {
  let node1 = new SingleNode(1);
  node1.setNext(new SingleNode(2));
  node1.next.setNext(new SingleNode(3));

  node1 = reverseLinkedList(node1);

  while (node1) {
    console.log('== value ==', node1.value);
    node1 = node1.next;
  }

  // console.log('=== reverse ===', node3.next.value, node2.next.value);
}

main();

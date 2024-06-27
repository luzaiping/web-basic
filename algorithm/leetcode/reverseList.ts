class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head;

  while (current !== null) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

function printList(head: ListNode | null): void {
  const values: number[] = [];
  while (head !== null) {
      values.push(head.val);
      head = head.next;
  }
  console.log(values.join(' -> '));
}

// 创建链表 1 -> 2 -> 3 -> 4 -> 5
let head: ListNode = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

console.log("原始链表:");
printList(head);

// 反转链表
let reversedHead: ListNode | null = reverseList(head);

console.log("反转后的链表:");
printList(reversedHead);
/**
 * The function `reverseList` reverses a singly linked list in TypeScript.
 * @param {ListNode | null} head - The `head` parameter in the `reverseList` function represents the
 * head node of a singly linked list. The function reverses the linked list by changing the direction
 * of the pointers between nodes and returns the new head node of the reversed list.
 * @returns The function `reverseList` is returning the head of the reversed linked list, which is
 * stored in the `prev` variable.
 */
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

function printReverseList(head: ListNode | null): void {
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
printReverseList(head);

// 反转链表
let reversedHead: ListNode | null = reverseList(head);

console.log("反转后的链表:");
printReverseList(reversedHead);
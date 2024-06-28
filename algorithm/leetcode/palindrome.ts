/* class ListNode {
  value: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null ) {
    this.value = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
} */

function isPalindrome(head: ListNode | null) {
  if (head === null || head.next === null) return true;

  // 使用快慢指针法找出链表中间节点
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // 反转后半部分链表
  let prev: ListNode | null = null;
  let current = slow; // 从中间节点开始反转
  while (current !== null) {
    let next = current.next; // 获取下一个节点，用于后面将当前节点移动到下一个节点
    current.next = prev; // 调整当前节点的指向，在这边实现节点反转
    prev = current; // 移动前一个节点到当前节点
    current = next; // 移动当前节点到下一个节点
  }

  // 比较前半部分和反转后的后半部分
  let firstHalf: ListNode | null = head;
  let secondHalf: ListNode | null = prev; // prev 目前指向原链表的末尾
  while (firstHalf !== null && secondHalf !== null) {
    if (firstHalf.val !== secondHalf.val) return false;

    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }
  return true;
}

// 测试
function printList(head) {
  const values: number[] = [];
  while (head !== null) {
      values.push(head.val);
      head = head.next;
  }
  console.log(values.join(' -> '));
}

// 创建链表 1 -> 2 -> 2 -> 1
let testHead = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(2);
head.next.next.next = new ListNode(1);

console.log("原始链表:");
printList(head);

const result = isPalindrome(head);
console.log("是否为回文链表:", result); // 输出 true
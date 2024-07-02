/**
 * The function `isPalindrome` in TypeScript checks if a given linked list is a palindrome by using the
 * fast-slow pointer technique to find the middle, reversing the second half of the list, and comparing
 * the first half with the reversed second half.
 * @param {ListNode | null} head - The `head` parameter in the `isPalindrome` function represents the
 * head node of a singly linked list. The function is checking whether the linked list is a palindrome,
 * meaning it reads the same forwards and backwards.
 * @returns The function `isPalindrome` returns a boolean value - `true` if the linked list is a
 * palindrome, and `false` if it is not.
 */
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
testHead.next = new ListNode(2);
testHead.next.next = new ListNode(2);
testHead.next.next.next = new ListNode(1);

console.log("原始链表:");
printList(testHead);

const result = isPalindrome(testHead);
console.log("是否为回文链表:", result); // 输出 true
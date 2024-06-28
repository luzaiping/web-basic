class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next = null) {
      this.val = val;
      this.next = next;
  }
}

// 快慢指针法
function hasCycle(head) {
  if (head === null || head.next === null) {
      return false;
  }

  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
      slow = slow.next; // 慢指针每次移动一步
      fast = fast.next.next; // 快指针每次移动两步

      if (slow === fast) {
          return true; // 快慢指针相遇，存在环
      }
  }

  return false; // 快指针到达链表末尾，不存在环
}
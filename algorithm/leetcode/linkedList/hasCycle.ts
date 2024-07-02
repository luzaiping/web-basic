// 快慢指针法
/**
 * The function `hasCycle` in TypeScript checks if a linked list has a cycle using the slow and fast
 * pointer approach.
 * @param head - The `head` parameter in the `hasCycle` function represents the starting node of a
 * linked list. The function is checking whether there is a cycle (loop) in the linked list by using
 * the slow and fast pointer technique. The `next` property of a node points to the next node in
 * @returns The function `hasCycle` returns a boolean value. It returns `true` if there is a cycle
 * (loop) in the linked list starting from the `head` node, and `false` if there is no cycle.
 */
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
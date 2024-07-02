/**
 * 
这是因为数学和几何的性质在链表中的环形结构中起作用。假设我们有一个快指针（每次移动两步）和一个慢指针（每次移动一步）。在环形链表中，这两个指针最终会在环内的某个点相遇。
假设从链表头到环的起点的距离为 a，环的起点到两指针相遇点的距离为 b，相遇点回到环的起点的距离为 c。
当慢指针进入环时，快指针已经在环内。为了让它们相遇，假设慢指针走了 b 的距离，快指针就走了 b+c 的距离，因为它的速度是慢指针的两倍。
所以我们有：
2(a+b) = a+b+c+b
a+b = c+b
a = c
这意味着从链表头到环的起点的距离等于从相遇点到环的起点的距离。
因此，当我们发现慢指针和快指针相遇时，我们可以将一个新的指针（比如 ptr）设置在链表的头部，并使其与慢指针以相同的速度移动。当这个新指针和慢指针相遇时，它们会在环的起点相遇，这就是为什么这种方法可以用来检测环的起点。
*/

// 1. 首先判断是否是链表是否有环
// 2. 如果有环，将其中一个重置到链表的头部，然后按相同速度移动，相交点就是入环的第一个节点

/**
 * The function `detectCycle` in TypeScript detects and returns the first node of a cycle in a linked
 * list using the Floyd's Tortoise and Hare algorithm.
 * @param {ListNode | null} head - The `head` parameter in the `detectCycle` function represents the
 * starting node of a linked list. The function is designed to detect and return the node where a cycle
 * begins in the linked list if there is a cycle present. If there is no cycle in the linked list, the
 * function will return
 * @returns The function `detectCycle` returns the first node of the cycle in a linked list if a cycle
 * is detected, otherwise it returns `null`.
 */
function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return null; // 没有节点或者只有一个节点，返回 null

  // 1. 判断是否有环：使用快慢指针法 (弗洛伊德龟兔算法)
  let fast: ListNode | null = head;
  let slow: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow?.next || null;

    if (slow === fast) {
      break;
    }
  }

  // 没有环的情形，返回 null
  if (fast === null || fast.next === null) {
    return null;
  }

  // 2. 获取第一个入环节点
  fast = head;
  while (fast !== slow) {
    fast = fast?.next || null;
    slow = slow?.next || null;
  }

  return fast;
}

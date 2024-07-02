/**
 * The function `getIntersectionNode` finds the intersection node of two linked lists by iterating
 * through both lists simultaneously.
 * @param {ListNode | null} headA - `headA` is a reference to the head node of the first linked list.
 * @param {ListNode | null} headB - `headB` is a reference to the head node of the second linked list.
 * In the `getIntersectionNode` function, it is used to traverse the second linked list to find the
 * intersection node with the first linked list (represented by `headA`). If the two linked lists
 * intersect, `
 * @returns The function `getIntersectionNode` returns the node where the two input linked lists
 * `headA` and `headB` intersect. If the linked lists do not intersect, it returns `null`.
 */
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (headA === null || headB === null) {
      return null;
  }

  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  while (pA !== pB) {
      // If reaching the end of the list, redirect to the head of the other list
      pA = pA === null ? headB : pA.next;
      pB = pB === null ? headA : pB.next;
  }

  // The meeting point is the intersection node; if no intersection, return null
  return pA;
}
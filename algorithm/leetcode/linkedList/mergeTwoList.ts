/**
 * The function `mergeTwoLists` merges two sorted linked lists into a single sorted linked list.
 * @param {ListNode | null} node1 - ListNode | null
 * @param {ListNode | null} node2 - ListNode | null
 * @returns The function `mergeTwoLists` returns the head of the merged linked list formed by merging
 * the two input linked lists `node1` and `node2`.
 */

function mergeTwoLists(
  node1: ListNode | null,
  node2: ListNode | null
): ListNode | null {
  let dummyNode = new ListNode();
  let current = dummyNode;

  while (node1 !== null && node2 !== null) {
    if (node1.val < node2.val) {
      current.next = node1; // link node1 as current next node
      node1 = node1.next; // move node1 pointer to next node
    } else {
      current.next = node2;
      node2 = node2.next;
    }
    current = current.next; // move current node to next node
  }

  // when one of list reaches its end, append the rest of other list to the new list. -- my version
  // When one of the linked lists is empty, directly connect the remaining part of the other linked list to the end of the new linked list -- gpt version
  current.next = node1 !== null ? node1 : node2;

  return dummyNode.next;
}

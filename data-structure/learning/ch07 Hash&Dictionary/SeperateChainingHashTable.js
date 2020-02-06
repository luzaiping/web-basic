const { loseloseHashCode, Node } = require('./hashCodeUtils');
const LinkedList = require('../ch05 LinkedList/LinkedList');

class SeperateChainingHashTable {
  constructor() {
    this.table = [];
  }

  put(key, value) {
    const position = loseloseHashCode(key);
    const node = new Node(key, value);

    if (this.table[position] === undefined) {
      this.table[position] = new LinkedList();
    }

    this.table[position].append(node);
  }

  get(key) {
    const position = loseloseHashCode(key);
    const linkedList = this.table[position];
    if (linkedList) {
      let current = linkedList.getHead();

      while (current) {
        if (current.element.key === key) return current.element.value;
        current = current.next;
      }
    }

    return undefined;
  }

  remove(key) {
    const position = loseloseHashCode(key);
    const linkedList = this.table[position];
    if (linkedList) {
      let current = linkedList.getHead();
      while (current) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            this.table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
}

module.exports = SeperateChainingHashTable;

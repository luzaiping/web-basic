const { loseloseHashCode, Node } = require('./hashCodeUtils');

class LinearProbingHashTable {
  constructor() {
    this.table = [];
  }

  put(key, value) {
    const position = loseloseHashCode(key);
    const node = new Node(key, value);

    if (this.table[position] === undefined) {
      this.table[position] = node;
    } else {
      let index = position + 1;

      while (this.table[index] !== undefined) {
        index++;
      }
      this.table[index] = node;
    }
  }

  get(key) {
    const position = loseloseHashCode(key);

    if (this.table[position] !== undefined) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (this.table[index] === undefined || this.table[index].key !== key) {
        index++;
      }
      if (this.table[index].key === key) {
        return this.table[index].value;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = loseloseHashCode(key);

    if (this.table[position] !== undefined) {
      if (this.table[position].key === key) {
        this.table[position] = undefined;
        return true;
      }
      let index = position + 1;
      while (this.table[index] === undefined || this.table[index].key !== key) {
        index++;
      }
      if (this.table[index].key === key) {
        this.table[position] = undefined;
        return true;
      }
    }
    return false;
  }
}

module.exports = LinearProbingHashTable;

const { loseloseHashCode } = require('./hashCodeUtils');

class HashTable {
  constructor() {
    this.table = [];
  }

  put(key, value) {
    const position = loseloseHashCode(key); // 计算 key 对应的散列码
    console.log(`${position} - ${key}`);
    this.table[position] = value;
  }

  get(key) {
    const position = loseloseHashCode(key);
    return this.table[position];
  }

  remove(key) {
    const position = loseloseHashCode(key);
    this.table[position] = undefined;
  }
}

module.exports = HashTable;

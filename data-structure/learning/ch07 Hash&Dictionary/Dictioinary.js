class Dictionary {
  constructor() {
    this.items = {};
  }

  has(key) {
    return key in this.items;
  }

  set(key, value) {
    this.items[key] = value;
  }

  remove(key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }

    return false;
  }

  get(key) {
    return this.has(key) ? this.items[key] : undefined;
  }

  values() {
    const arr = [];
    const keys = Object.keys(this.items);
    for (let i = 0; i < keys.length; i++) {
      arr.push(this.items[keys[i]]);
    }
    return arr;
  }

  getItems() {
    return this.items;
  }

  clear() {
    this.items = {};
  }

  size() {
    return this.keys().length;
  }

  keys() {
    return Object.keys(this.items);
  }

}

module.exports = Dictionary;

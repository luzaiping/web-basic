/**
 * 表示一个动物类
 * @class
 */
class Animal {
  /**
   * 构造函数
   * @constructor
   * @param {string} type - 动物类型
   */
  constructor(type) {
    this.type = type;
  }

  /**
   * 动物叫声
   */
  say() {
    console.log(`${this.type}: enenenenene`);
  }
}

module.exports = Animal;

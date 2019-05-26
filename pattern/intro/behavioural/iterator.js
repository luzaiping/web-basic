/**
 * it is a behavioural design pattern that provides a way to access the elements
 * of an aggregate object sequentially without exposing its underlying representation.
 * 迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。
 * 
 * Iterator 通常提供 2个 方法 : hasNext 和 next
 */

function IteratorClass(elems) {
  this.index = 0;
  this.elems = elems;
}

IteratorClass.prototype = {
  next: function() {
    let result = this.elems[this.index];
    this.index++;
    return result;
  },
  hasNext: function() {
    return this.index < this.elems.length ;
  }
}

let iter = new IteratorClass(['aaa','bbbb','ccccc'])

while (iter.hasNext()) {
  console.log(iter.next())
}

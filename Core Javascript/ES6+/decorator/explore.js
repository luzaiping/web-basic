class Cat {
  constructor(name) {
    this.name = name;
  }
  @readonly //暂时还不支持，只能先注释掉
  meow() {return `${this.name} says Meow`}
}

// 这个方法签名同 Object.defineProperty是一样
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

let cat = new Cat('cat');
cat.meow();

cat.meow = function() {
  return 'say another ......';
}

cat.meow();
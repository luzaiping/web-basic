const Stack = require('./Stack');

/**
 * 十进制数字转换为指定进制的数字
 * @param {*} decNumber 十进制数字
 * @param {*} base 要转换的进制，比如 2，8，16 分别代表 二进制，八进制，十六进制
 * @param {*} prefix 进制的前缀，比如 八进制是 'o'
 */
function baseConverter(decNumber, prefix, base = 2) {
  const remStack = new Stack();
  let rem; // 余数
  let binaryStr = '';
  let number = decNumber; // 商
  const digits = '0123456789ABCDEF';

  while (number > 0) {
    rem = Math.floor(number % base); // 求余: a mod b = c
    remStack.push(rem);
    number = Math.floor(number / base); // 除法
  }

  while (!remStack.isEmpty()) {
    binaryStr += digits[remStack.pop()];
  }
  return `${prefix}${binaryStr}`;
}

function toBinary(decNumber) {
  return baseConverter(decNumber, '0b');
}

function toOctal(decNumber) {
  return baseConverter(decNumber, '0o', 8);
}

function toHex(decNumber) {
  return baseConverter(decNumber, '0x', 16);
}

console.log(toBinary(10));
console.log(toBinary(4));
console.log(toBinary(8));

console.log(toOctal(8));
console.log(toOctal(15));
console.log(toOctal(23));

console.log(toHex(15));
console.log(toHex(16));
console.log(toHex(32));
console.log(toHex(48));

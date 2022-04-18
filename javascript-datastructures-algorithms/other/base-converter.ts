import Stack from "../data-structures/stack/stack";

// stack 的应用
// 将一个十进制数字转换为二进制格式
// 原理： 对数字除以2并对尚取整，直到结果是 0 为止
// 依次将 余数 加入到栈里，然后将栈顶到栈底的数字拼接起来就得到二进制
export function decimalToBinary(decNumber: number) {
  const remStack = new Stack<number>(); // 构造一个存储余数的栈
  let rem: number; // 余数
  let binaryStr = ''; // 最终的二进制

  while (decNumber > 0) { // 如果 decNumber 大于 0，就继续执行
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2); // 继续往下除
  }

  while (remStack.size() > 0) {
    binaryStr += `${remStack.pop()}`; // 从栈顶开始拼接字符串
  }

  return binaryStr;
}

// 将一个十进制数字转换为任意进制(2 ~ 36 之间)的字符串
// 原理跟decimalToBinary，数字除于进制 base，将余数存入 stack 里，直到最终的商等于0
// 然后将栈里内容拼接起来即可。这边需要多一个字符映射
// 10个数字 + 26个英文字母，一次代表 0 ~ 36 的数字
export function baseConvert(descNumber: number, base: number): string {
  if (!(base >= 2 && base <= 36)) {
    return '';
  }

  const remStack = new Stack<number>();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rem: number;
  let result = '';


  while (descNumber > 0) {
    rem = Math.floor(descNumber % base);
    remStack.push(rem);
    descNumber = Math.floor(descNumber / base);
  }
  
  while (remStack.size() > 0) {
    result += digits[remStack.pop()];
  }

  return result;
}

// console.log('== 10 ==', decimalToBinary(10));
console.log('== 10 ==', baseConvert(100345, 2));
console.log('== 10 ==', baseConvert(100345, 8));
console.log('== 10 ==', baseConvert(100345, 16));
console.log('== 10 ==', baseConvert(100345, 35));

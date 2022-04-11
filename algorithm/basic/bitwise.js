/* eslint-disable no-bitwise */
// 打印一个数字的二进制内容
function printBinary(num = 1) {
  let binaryNum = '';
  for (let i = 31; i >= 0; i--) {
    const binary = (num & (1 << i)) === 0 ? '0' : '1';
    binaryNum += binary;
  }
  return binaryNum;
}

const num = 3;
const negativeNum = ~num + 1; // 一个值的负数：对这个数取反 + 1

// console.log(printBinary(10));
// console.log(printBinary(10 << 1));
// console.log(printBinary(10 << 2));
console.log(printBinary(10 >> 1));
console.log(10 >> 1);
console.log(num, negativeNum);
// console.log(10 & 10);

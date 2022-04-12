// 前置和实现
// 对于给定整数数组，要能快速算出 [L, R] 范围内的总和
// 比如给定数组 [2, 4, 6, 8, 9, 12, 21, 33, 45]，要求算出 [2, 6] 范围的数字综合
// 应该是 6 + 8 + 9 + 12 + 21
// 因为调用次数是非常多，要求设计一个可以快速算出 [L, R] 范围的数字总和
// 思路是构造一个新的数组，该数组每一位的值等于前面数值之和加上当前位置的数值,
// 比如上面那个数组，最终要得到 [2, 6, 12, 20, 29, 41, 62, 95, 140] 这样的数组
// 这样要算出 [L, R] 范围的值，就可以用 [0, R] - [0, L - 1]
// 这种效率高是因为直接使用数组偏移量查询值，数组在内存中是以连续快存在，所以很快
function preSum(arr: Array<number>): Array<number> {
  const preSumArr = [arr[0]]; // 初始化 preSumArr 等于初始数组第一位
  const { length } = arr;
  for (let i = 1; i < length; i++) {
    preSumArr[i] = preSumArr[i - 1] + arr[i];
  }
  return preSumArr;
}

const tesingArr = [2, 4, 6, 8, 9, 12, 21, 33, 45];
console.log('== preSumArr ==', preSum(tesingArr));

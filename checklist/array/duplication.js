/**
 * 数组去重的几种实现方法
 */

const array = [1, 1, '1'];

/**
 * 使用 indexOf 判断值是否存在于数组中，根据这个决定是否将元素添加到去重后的数组
 * @param {Array} arr 要去重的数组
 * @returns {Array} 去重后的数组
 */
function indexOfUnique(arr) {
  const result = [];
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log('indexOfUnique:', indexOfUnique(array));

/**
 * 先对原数组进行排序，定义一个 previousValue 用于存储上一次比较的值
 * 如果当前索引是否是 0 或者 previousValue !== sortedArray[i]，说明
 * 当前值就是不重复的值，可以加到结果数组里
 * @param {Array} arr
 */
function sortedUnique(arr) {
  const result = [];
  const sortedArray = arr.concat().sort();
  const { length } = sortedArray;
  let previousValue;

  for (let i = 0; i < length; i++) {
    if (i === 0 || previousValue !== sortedArray[i]) {
      result.push(sortedArray[i]);
    }
    previousValue = sortedArray[i];
  }

  return result;
}

console.log('sortedUnique:', sortedUnique(array));

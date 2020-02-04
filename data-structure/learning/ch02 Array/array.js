/* eslint-disable no-unused-vars */
/**
 * 在数组最前面添加一个元素
 * 需要将每一个元素向后移动一位，留出最前面的位置给新元素
 * 这个相当于往 队列 头部添加一个元素
 */
function unshift(newValue, arr = []) {
  const { length } = arr;
  const copyArr = [...arr];
  for (let i = length; i >= 0; i -= 1) {
    copyArr[i] = copyArr[i - 1];
  }
  copyArr[0] = newValue;
  return copyArr;
}

/**
 * 删除数组中第一个元素，需要后面每个元素向前移动一位
 * 同时要将原先最后一个元素去掉
 * 相当于删除队列中第一个元素
 */
function shift(arr = []) {
  const { length } = arr;
  const copyArr = [...arr];
  for (let i = 0; i < length - 1; i += 1) {
    copyArr[i] = copyArr[i + 1];
  }
  return copyArr;
}

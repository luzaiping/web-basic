// 生成指定最大长度和最大值的随机数组，用于测试数据
export function generateRandomArray(maxLength: number, maxValue: number) {
  const length = Math.floor(Math.random() * (maxLength + 1)); // 随机长度
  const arr = new Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = Math.floor((maxValue + 1) * Math.random());
    //  -
    // Math.floor(maxValue * Math.random()); // 随机值，范围在 [0, maxValue) 之间
  }
  return arr;
}

// 生成随机无序数组，并且前后数值不相等
export function generateRandomUnsortedArray(
  maxLength: number,
  maxValue: number
) {
  const length = Math.floor(Math.random() * (maxLength + 1)); // 随机长度
  const arr = new Array(length);
  if (length > 0) {
    arr[0] = Math.floor(Math.random() * maxValue);
    for (let i = 1; i < length; i++) {
      do {
        arr[i] = Math.floor(Math.random() * maxValue);
      } while (arr[i] === arr[i - 1]);
    }
  }
  return arr;
}

export function findIndex(arr: Array<number>, target: number): number {
  return arr.findIndex(item => item >= target);
}

export function findIndexNegative(arr: Array<number>, target: number): number {
  const { length } = arr;
  for (let i = length - 1; i > 0; i--) {
    const value = arr[i];
    if (value <= target) return i;
  }
  return -1;
}

// 判断某个值是否存在指定的数组里
export function hasExisted(arr: Array<number>, target: number): boolean {
  return findIndex(arr, target) > -1;
}

// 验证指定的 index 是否是数组中的最小值
export function check(arr: Array<number>, minIndex: number): boolean {
  if (arr.length === 0) return true;

  const left = minIndex - 1;
  const right = minIndex + 1;

  const isLeftBigger = left >= 0 ? arr[left] > arr[minIndex] : true;
  const isRightBigger = right < arr.length ? arr[right] > arr[minIndex] : true;

  return isLeftBigger && isRightBigger;
}
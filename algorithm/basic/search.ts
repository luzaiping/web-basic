import { generateRandomArray, hasExisted, findIndex, check, generateRandomUnsortedArray } from './utils';
// 二分查找

// 基本的查找方法，二分法
// 给定有序数字 arr，要查找目标 target 数字是否在数组中
function binarySearch(arr: Array<number>, target: number): boolean {
  if (!arr || arr.length === 0) return false; // 边界情形

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // 中位
    if (arr[mid] === target) {
      return true;
    } else if (arr[mid] < target) {
      // 中间数字大于 target，说明左边的数字都不符合要求，只能往右边找了
      left = mid + 1;
    } else {
      // 中间数字大于 target，说明右边的数字都不符合要求，只能往左边找了
      right = mid - 1;
    }
  }
  return false;
}

// 在有序数组中查找大于等于 target 最左的位置
function findMostLeftIndex(arr: Array<number>, target: number): number {
  if (!arr || arr.length === 0) return -1; // 边界情形

  let left = 0;
  let right = arr.length - 1;
  let ans = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // 中间位置

    if (arr[mid] >= target) {
      // 中间位置的数值 >= 目标数值，那么右边的就不需要，直接去掉，同时更新 ans 为目中间位置
      right = mid - 1;
      ans = mid;
    } else {
      // 中间位置的数值 < 目标数值， 那么左边的就不需要，直接去掉
      left = mid + 1;
    }
  }

  return ans;
}

// 从无序数组中找到局部最小值的索引
function findLessIndex(arr: Array<number>): number {
  if (!arr || arr.length === 0) return -1;

  const { length } = arr;

  if (length === 0) return length;

  if (arr[0] < arr[1]) return 0;
  if (arr[length - 2] > arr[length - 1]) return length - 1;

  let left = 0;
  let right = length - 1;

  while (left < right - 1) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid - 1] > arr[mid] && arr[mid] < arr[mid + 1]) {
      return mid;
    } else if (arr[mid] > arr[mid - 1]) {
      right = mid - 1;
      continue;
    } else {
      left = mid + 1;
      continue;
    }
  }
  // while 结束才会执行到这边，这时候就是 left >= right - 1
  // 即已经2分到最多剩下2个数字，就可以直接比较这2个数字了
  return arr[left] < arr[right] ? left : right;
}

function main() {
  let testTime = 10000;
  let maxLength = 50;
  let maxValue = 1000;
  let successed = true;

  for (let i = 0; i < testTime; i++) {
    const arr = generateRandomUnsortedArray(maxLength, maxValue);
    const lessIndex = findLessIndex(arr);
    if (!check(arr, lessIndex)) {
      console.log('=== 有问题 ==', arr, lessIndex);
      break;
    }

    // if (findIndex(arr, target) !== findMostLeftIndex(arr, target)) {
    //   console.log(
    //     '== someing went wrong ==',
    //     arr,
    //     target,
    //     findIndex(arr, target),
    //     findMostLeftIndex(arr, target)
    //   );
    //   successed = false;
    //   break;
    // }
  }
  console.log(successed ? 'nice' : 'fucking');
}

main();

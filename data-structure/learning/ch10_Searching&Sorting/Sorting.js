/* eslint-disable no-param-reassign */
/**
 * 首先判断数组长度，如果等于1，直接返回数组
 * 否则将数组按长度分为两半，一直分下去，最终的小数组只有一个元素
 * 然后调用 merge 进行排序合并成大数组
 * @param {Array} array - 要排序的原数组
 */
function mergeSortRecu(array) {
  const { length } = array;
  if (length === 1) return array;

  const mid = Math.floor(length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid, length);

  /**
   * 将左边数组第一个元素跟右边数组第一个元素比对，如果左边值小，就将这个值放入目标数组
   * 同时将左边数组索引加 1，再跟右边第一个数组比对；如果右边值小，将右边的值放入目标数组
   * 将右边数组索引加1。因为 leftArr 和 rightArr 本身就是排好序，所以经过这步后一定会有
   * 一个数组会完全添加到 目标数组中，剩下元素的那个数组，再将剩余元素都加到目标数组的最后
   * @param {Array} leftArr - 分完后的左边数组
   * @param {Array} rightArr - 分完后的右边数组
   * @returns results - 合并后的数组，已经过排序
   */
  function merge(leftArr, rightArr) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] < rightArr[rightIndex]) {
        result.push(leftArr[leftIndex++]);
      } else {
        result.push(rightArr[rightIndex++]);
      }
    }

    while (leftIndex < leftArr.length) {
      result.push(leftArr[leftIndex++]);
    }

    while (rightIndex < rightArr.length) {
      result.push(rightArr[rightIndex++]);
    }

    return result;
  }

  return merge(mergeSortRecu(left), mergeSortRecu(right));
}

function quick(inputArray, leftIndex, rightIndex) {
  let index;

  function partition(array, left, right) {
    const position = Math.floor((left + right) / 2);
    const pivot = array[position];
    let i = left;
    let j = right;

    function swapQuickStort(swapArray, index1, index2) {
      const aux = swapArray[index1];
      swapArray[index1] = swapArray[index2];
      swapArray[index2] = aux;
    }

    while (i <= j) {
      while (array[i] < pivot) {
        i++;
      }
      while (array[j] > pivot) {
        j--;
      }
      if (i <= j) {
        swapQuickStort(array, i, j);
        i++;
        j--;
      }
    }
    return i;
  }

  if (inputArray.length > 1) {
    index = partition(inputArray, leftIndex, rightIndex);

    if (leftIndex < index - 1) {
      quick(inputArray, leftIndex, index - 1);
    }

    if (index < rightIndex) {
      quick(inputArray, index, rightIndex);
    }
  }
}

function ArrayList() {
  let array = [];

  function swap(i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  this.insert = function(item) {
    array.push(item);
  };

  this.toString = function() {
    return array.join();
  };

  /**
   * 冒泡排序，最简单也是效率最低的排序方式
   * 时间复杂度 O(n * n)
   */
  this.bubbleSort = function() {
    const { length } = array;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1; j++) {
        if (array[j] > array[j + 1]) {
          swap(j, j + 1);
        }
      }
    }
  };

  /**
   * 改进版的冒泡排序，同上面的冒泡排序唯一区别是内部循环里 j < length - 1 - i
   * 这样可以避免跟已经排行序的元素再比较
   * 虽然已经做了改进，但是时间复杂度不变，还是 O(n * n)
   */
  this.improvedBubbleSort = function() {
    const { length } = array;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          swap(j, j + 1);
        }
      }
    }
  };

  /**
   * 选择排序
   * 复杂度也是 O(n * n)
   */
  this.selectionSort = function() {
    const { length } = array;
    let minIndex; // 最小数对应的索引

    // 从第一个索引到倒数第二个索引进行遍历(最后一个不需要，因为前面遍历完，就排好序)
    // 每一个索引，都需要跟它之后的索引进行比对，找出最小数的索引，然后交换位置
    for (let i = 0; i < length - 1; i++) {
      minIndex = i; // 将当前索引设置成值最小的索引
      // 从最小值索引开始往后遍历，前面的索引无需遍历，因为已经交换过位置
      for (let j = i; j < length; j++) {
        if (array[minIndex] > array[j]) {
          // 依次比对，将值比较小的那个索引设置给minIndex
          minIndex = j;
        }
      }

      if (i !== minIndex) {
        swap(i, minIndex);
      }
    }
  };

  /**
   * 插入排序：将当前位置的值跟前面的值一一进行比较，找到要插入的位置后将值存入
   * 当排序长度比较小的数组时，这个算法要比冒泡和选择排序快
   */
  this.insertionSort = function() {
    const { length } = array;

    // i 要从 1 开始，0 假定是已经排好序
    for (let i = 1; i < length; i++) {
      let j = i; // j 表示最终要插入的位置，初始等于 i
      const temp = array[i]; // 要被插入的元素值
      // 依次跟前一个位置的值比较
      // 如果前一个位置的值大于要插入的值
      while (j > 0 && array[j - 1] > temp) {
        array[j] = array[j - 1]; // 就将前一个位置的值往后移动一个位置
        j--; // 再比较前一个位置的值
      }
      array[j] = temp;
    }
  };

  /**
   * 合并排序，复杂度 O(n logn) 这个性能要比前面三个快；前面三个算法的性能都一般，不推荐使用
   */
  this.mergeSort = function() {
    array = mergeSortRecu(array);
  };

  this.quickSort = function() {
    quick(array, 0, array.length - 1);
  };
}

function createNonSortedArray(size) {
  const array = new ArrayList();
  for (let i = size; i > 0; i--) {
    array.insert(i);
  }
  return array;
}

const array = createNonSortedArray(20);
console.log(array.toString());

// console.log('========== after bubbleSort ============');
// array.bubbleSort();
// console.log(array.toString());

// console.log('========== after selectionSort ============');
// array.selectionSort();
// console.log(array.toString());

// console.log('========== after intertionSort ============');
// array.insertionSort();
// console.log(array.toString());

console.log('========== after mergeSort ============');
array.mergeSort();
console.log(array.toString());

module.exports = ArrayList;

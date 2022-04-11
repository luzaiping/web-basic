function swapValue(arr: Array<number>, i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 对指定数字数组进行从小到大的排序
function selectionSort(arr: Array<number>) {
  if (!arr || arr.length < 2) return arr;

  const newArr = [...arr];
  const { length } = newArr;

  for (let i = 0; i < length; i++) {
    let minValueIndex = i; // 初始最小值为当前迭代的起始位置
    for (let j = i + 1; j < length; j++) {
      // 在循环中算出最小值的索引
      minValueIndex = newArr[j] < newArr[minValueIndex] ? j : minValueIndex;
    }
    // 一次循环下来，如果找到的最小值位置跟最初位置不一样，那就得交换这2个位置的值
    if (minValueIndex !== i) {
      swapValue(newArr, i, minValueIndex);
    }
  }
  return newArr;
}

function bubbleSort(arr: Array<number>) {
  if (!arr || arr.length < 2) return arr;

  const newArr = [...arr];
  const { length } = newArr;

  // 0 ~ n-1
  // 0 ~ n-2
  // 0 ~ 1
  for (let endIndex = length - 1; endIndex >= 0; endIndex--) {
    // 0 ~ end, 每次循环里，交互相邻 2个数的位置，右边的数用 rightIndex 表示
    // rightIndex 从 1 开始，先比对 0 和 1，满足条件就交换，然后 1 和 2，一直到 endIndex -1 和 endIndex
    // 这样就完成一次冒泡排序
    for (let rightIndex = 1; rightIndex <= endIndex; rightIndex++) {
      if (newArr[rightIndex - 1] > newArr[rightIndex]) {
        swapValue(newArr, rightIndex - 1, rightIndex);
      }
    }
  }
  return newArr;
}

function insertionSor1(arr: Array<number>): Array<number> {
  if (!arr || arr.length < 2) return arr;

  // 0 ~ 0 不用处理
  // 0 ~ 1 要处理
  // 0 ~ 2 处理
  // 0 ~ n - 1 处理
  // 变的是后面的数字，后面数的索引用 end 表示
  const { length } = arr;
  for (let end = 1; end < length; end++) {
    // 比如 end 是 2，这时候要比对然后交换数字
    // end左边还有数，并且左边的数大于 end位置的数，就交换
    let newValueIndex = end;
    while (newValueIndex > 0 && arr[newValueIndex - 1] > arr[newValueIndex]) {
      swapValue(arr, newValueIndex - 1, newValueIndex); // 交换前后值
      newValueIndex--; // 交换后新值的索引向左移动，即要减1
    }
  }
  return arr;
}

function insertionSor2(arr: Array<number>): Array<number> {
  if (!arr || arr.length < 2) return arr;

  // 0 ~ 0 不用处理
  // 0 ~ 1 要处理
  // 0 ~ 2 处理
  // 0 ~ n - 1 处理
  // 变的是后面的数字，后面数的索引用 end 表示
  const { length } = arr;
  for (let end = 1; end < length; end++) {
    // 比如 end 是 2，定义前一个的索引为 preIndex，这个索引>=0 并且前一个数比后一个数大，就交换位置
    // 同时 preIndex 向左移动一位
    for (
      let preIndex = end - 1;
      preIndex >= 0 && arr[preIndex] > arr[preIndex + 1];
      preIndex--
    ) {
      swapValue(arr, preIndex, preIndex + 1);
    }
  }
  return arr;
}

const arr = [19, 20, 93, 4, 21, 47, 85, 1, 39, 35];
console.log(selectionSort(arr));
console.log(bubbleSort(arr));
console.log(insertionSor1(arr));
console.log(insertionSor2(arr));

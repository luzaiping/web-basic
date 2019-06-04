/**
 * 
 * 思路: 冒泡排序属于基本排序算法,大致思路是两层循环嵌套.
 * 整理思路: 外循环遍历数组的每一项,确定两两比较循环的次数(其实最后一次可以省略)，
 * 内循环则用于确定单次循环两两元素比较的次数,注意外层每循环一次,内循环两两比较的次数就会减1
 */
function bubble(arr) {
  let newArr = [...arr];
  var length = arr.length;
  var temp;
  for (var i=0; i<length; i++) {
    for (var j=0; j<length-1-i; j++) { // 这边 j < length - 1 - i 是因为 i 表示已经排好序的数目, 就不需要再比较了
      if(newArr[j] > newArr[j+1]) {
        temp = newArr[j+1];
        newArr[j+1] = newArr[j];
        newArr[j] = temp;
        // [newArr[j], newArr[j+1]] = [newArr[j+1], newArr[j]] // 通过 destructure 实现值交换
      }
    }
  }
  return newArr;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4, 71, 19,50,48];
console.log(bubble(arr))

function selection(arr) {
  let newArr = [...arr]
  var length = arr.length;
  var minIndex, temp;

  for (var i=0; i<length; i++) {
    minIndex = i; // 设置当前起始索引是最小的值
    for (var j=i+1; j<length; j++) {
      if(newArr[j] < newArr[minIndex]) {
        minIndex = j
      }
    }
    [newArr[minIndex], newArr[i]] = [newArr[i], newArr[minIndex]];
  }

  return newArr
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(selection(arr))
const addValue = (arr, value) => [...arr, value]

let oldArr = [1, 2, 3]
let newArr = addValue(oldArr, 4)

console.log(oldArr, newArr)
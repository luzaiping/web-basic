// 强制目标fn只有一个parameter
function unary(fn) {
    return function onlyOneArg(arg) {
        return fn(arg)
    }
}
let arr = ['1', '2', '3']
// arr.map(function(string, radix) {
//     console.log(parseInt(string, radix))
// })
console.log(arr.map(parseInt))
console.log(arr.map(unary(parseInt)))
const particalHelper = require('./particalHelper')

function test(x, y, z, m) {
    console.log(x, y , z, m)
    return (x + y) * z
}

let particalTest = particalHelper.partical(test, 1, 2)
let particalRightTest = particalHelper.particalRight(test, 1, 2)
let particalRightAllTest = particalHelper.particalRightAll(test, 1, 2)
console.log(particalTest(3, 4))
console.log(particalRightTest(3, 4))
console.log(particalRightAllTest(3, 4))
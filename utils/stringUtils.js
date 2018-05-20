/**
 * 获取字符串中指定子字符串出现的索引和次数
 * @param {*} str 
 * @param {*} reg
 * @returns 包含子字符串的索引数组
 * example
 * **************************************
 * let str = 'abcdefabcdefabcdefabcdef' *
 * let reg = /\s*(def)/g                *
 * getAllMatch(str, reg)                * 
 * **************************************
 */
export function getAllMatch(str, reg) {
  var matchResult
  var indexResult = []
  while(matchResult = reg.exec(str)) {
    indexResult.push(matchResult.index)
  }
  console.log(indexResult, indexResult.length)
}

/**
 * structural design pattern
 * 被用来提供一个统一和简单的方法，内部包含了具体实现细节，外部不需要去关心实现细节
 * 这个pattern比较容易理解，比如浏览器的绑定事件,可以提供一个公共的function，内部根据不同浏览器
 * 分别应用事件绑定
 */

var addMyEvent = function (element, type, fn) {
  if (element.addEventListener) {
    element.addEventListener(type, fn, false)
  } else if (element.attachEvent) {
    element.attachEvent(`on${type}`, fn)
  } else {
    element[`on${type}`] = fn
  }
}
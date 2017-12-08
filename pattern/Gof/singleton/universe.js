/**
 * 另一种单例的实现方式，比较少用
 */
function Universe() {

    if (typeof Universe.instance === 'object') {
        return Universe.instance
    }

    this.name = 'Felix'
    this.startTime = 0

    Universe.instance = this // 把构造函数对象的instance属性指向新创建的对象

    // 没有return，则隐式返回 this 对象, 因为是构造函数，所以 this 指向新创建的对象
}

let obj1 = new Universe()
let obj2 = new Universe()

console.log(obj1 === obj2)
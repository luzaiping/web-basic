/**
 * Created by Administrator on 2016/11/29.
 */

var mySingleton = function() {

    let instance

    /* 负责生成实例的方法 */
    function init() {

        function privateMethod() {
            console.log('I am private.')
        }

        let privateVariable = 'I am also private.'
        let privateRandomNumber = Math.random()

        // 返回全局唯一的 instance，这个instance 通过 singleton 的 getInstance() 获取
        return {
            publicProperty: 'I am also public.',
            publicMethod: function() {
                console.log('The public can see me.')
            },
            getRandomNumber: function() {
                return privateRandomNumber
            }
        }
    }

    return {
        getInstance: function () {
            if(!instance) {
                instance = init()
            }
            return instance
        }
    }
}()

let instance = mySingleton.getInstance()
let instance2 = mySingleton.getInstance()
console.log(instance === instance2)
console.log(instance.getRandomNumber() === instance2.getRandomNumber())

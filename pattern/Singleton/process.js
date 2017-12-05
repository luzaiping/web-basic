/**
 * 单纯的对象字面量
 */
let mySingleton = {
    property1: 'something',
    property2: 'something else',
    method1: function() {
        console.log('hello world')
    }
}

/**
 * 通过闭包，封装私有变量和方法；返回对象字面量，返回的对象包含的属性和方法是公共
 * 这个不是单例，因为每次调用函数，都会生成一个新的对象
 */
let mySingleton2 = function() {

    /* 这边声明私有变量和方法 */
    let privateVariable = 'something private'
    function privateMethod() {
        console.log(privateVariable)
    }

    /* 共有变量 和 方法 (可访问私有变量 和 方法) */
    return {
        publicMethod: function() {
            privateMethod()
        },
        publicVariable: 'public can see this!'
    }
}

/**
 * 这个是单例
 */
let singleton = (function() {
    let instance

    function init() {
        let privateVariable = 'something private'
        function privateMethod() {
            console.log(privateVariable)
        }

        return {
            publicMethod: function() {
                privateMethod()
            },
            publicVariable: 'public can see this!'
        }
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = init()
            }
            return instance
        }
    }
})()

singleton.getInstance().publicMethod()
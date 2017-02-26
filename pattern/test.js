/**
 * Created by Administrator on 2016/11/29.
 */

// three ways create object
var  o = {};
var o2 = new Object();
var o3 = Object.create(Object.prototype);

// four ways to define property on obj

// 1
o.someKey = 'hello world';

// 2
o['someKey'] = 'hello world';

// 3
Object.defineProperty(o, 'someKey',{
    value: 'hello world',
    configure: true,
    enumerable: true,
    writable: true
});

// 4
Object.defineProperties(o, {
    someKey: {
        value: 'hello world',
        configure: true,
        enumerable: true,
        writable: true
    },
    anotherKey: {
        value: 'hello world2',
        configure: true,
        enumerable: true,
        writable: true
    }
});


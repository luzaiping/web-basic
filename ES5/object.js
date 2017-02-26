function inherit(parentObject) {
    if(!parentObject) throw TypeError();
    if(Object.create) {
        return Object.create(parentObject);
    }

    var type = typeof parentObject;
    if(type !== 'object' && type !== 'function') {
        throw TypeError();
    }

    function f() {}
    f.prototype = parentObject;
    return new f();
}

function classof(o) {
    if(o === null) return 'Null';
    if(o === undefined) return 'Undefined';
    return Object.prototype.toString.call(o).slice(8, -1);
}

console.log(classof(null));
console.log(classof(undefined));
console.log(classof(1));
console.log(classof(''));
console.log(classof(false));
console.log(classof({}));
console.log(classof(/./));
console.log(classof(new Date()));
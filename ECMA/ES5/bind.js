/**
 * Created by Administrator on 2016/11/30.
 */

Function.prototype.bind = function (obj) {
    var self = this
    var boundArgs = Array.prototype.slice.call(arguments, 1);

    return function () {
        var args = [], i;

        [boundArgs, arguments].forEach(function (value) {
            for(i=0; i< value.length; i++) {
                args.push(value[i]);
            }
        });

        return self.apply(obj, args);
    };
};

function f(y,z) {
    return this.x + y + z;
}

var g = f.bind({x:5}, 2);
console.log(g(4));
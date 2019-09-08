/**
 * Created by Administrator on 2016/11/30.
 */

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1), // 第一次传递的参数，转成数组
        fToBind = this, // 具体要调用的函数
        fNOP    = function() {}, // 空函数
        fBound  = function() {
          return fToBind.apply(
            this instanceof fNOP ? this : oThis,
            aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}

function f(y,z) {
    return this.x + y + z;
}

var g = f.bind({x:5});
console.log(g(5,4));
if (!Function.prototype.bind)(function() {
  Function.prototype.bind = function() {
    let targetFn = this;
    let bindObj = arguments[0];
    let initArgs = Array.prototype.slice.call(arguments, 1);

    return function() {
      let currentArgs = Array.prototype.slice.call(arguments, 0)
      return targetFn.apply(bindObj, initArgs, currentArgs)
    }
  }
})();

function importJavaScript (url, callback) {

    var scriptNode = document.createElement('script');

    if(typeof callback === 'function') {
        if(RCM.Platform.isIE()) {
            scriptNode.onreadystatechange = function() {
                var readyState = scriptNode.readyState;
                if(readyState === 'complete' || readyState === 'loaded') {
                    scriptNode.onreadystatechange = null;
                    callback();
                }
            }
        } else {
            scriptNode.onload = callback;
            scriptNode.onerror = callback;
        }
    }

    scriptNode.src = url;
    scriptNode.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(scriptNode);
}

function A() {
    this.name = 'Felix';
}

A.prototype.age = 10;

function extend(parentConstructor, childConstructor) {
    function fn() {};
    fn.prototype = parentConstructor.prototype;
    childConstructor.prototype = new fn();
    childConstructor.prototype.constructor = childConstructor;
    childConstructor.superType = parentConstructor;
}

function B() {
    this.name = 'Sandy';
}

extend(A, B);

var b = new B();
console.log(b.name, b.age);

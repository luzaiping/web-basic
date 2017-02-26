/**
 * Created by Administrator on 2016/11/29.
 */

var mySingleton = function() {

    var instance;

    function init() {
        // do some initialization right here and return singleton
        return {
            name: 'init'
        };
    }

    return {
        getInstance: function () {
            if(!instance) {
                instance = init();
            }
            return instance;
        }
    }
}();

var instance = mySingleton.getInstance();
console.log(instance.name);

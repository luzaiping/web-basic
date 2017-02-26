/**
 * Created by Administrator on 2016/11/30.
 */

var jQuery = function(selector, context) {
    return new jQuery.fn.init( selector, context );
};

jQuery.add = function() {
    console.log('function add');
};

jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: '3.1.1',
    constructor: jQuery,
    length: 0, // The default length of a jQuery object is 0
    add: function () {
        console.log('prototype add');
    }
};

var init = jQuery.fn.init = function(selector, context, root) {
    this[ 0 ] = selector;
    this.length = 1;
    return this;
};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;


var $ = jQuery;
var target = $('a');
target.add();

function A() {}

A.prototype = init.prototype;

console.log(target instanceof jQuery);
console.log(target instanceof init);
console.log(target instanceof jQuery.fn.init);
console.log(target instanceof jQuery.prototype.init);
console.log(target instanceof A);
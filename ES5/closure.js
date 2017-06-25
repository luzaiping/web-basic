/*function foo() {
	var x = 1;
	return {
		bar: function() {
			return ++x
		},
		baz: function() {
			return --x;
		}
	};
}

var closure = foo();

console.log(closure.bar(), closure.baz());*/

var a = [];

var str = "something";

for(var i=0; i<5; i++) {
	a[i] = function(i) {
        return function() {
			console.log(i);
        }
	}(i);
}

a[2]();
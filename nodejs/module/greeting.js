var obj = {
	say: function() {
		return "Hello";
	}
};

module.exports = exports = obj.say = function() {
	return "as a property of exports";
};

console.log(module.exports === exports);
console.log(exports === obj.say);
function foo() {
	function A(){
		this.x = 10;
	}

	A.prototype.y = 20;

	// var a = new A();
	// console.log(a.x, a.y);

	function B(){}
	B.prototype = new A();

	var b = new B();
	B.prototype.constructor = B;

	console.log(b.x, b.y);
}

function bar() {
	function A(){
		this.x = 10;
	}

	A.prototype.y = 20;

	// var a = new A();
	// console.log(a.x, a.y);

	function B() {
		B.supertype.constructor.apply(this, arguments);
	}

	function extend(parentType, childType) {
        var F = function() {};
        F.prototype = parentType.prototype;
        childType.prototype = new F();
        childType.supertype = parentType.prototype;
        childType.prototype.constructor = childType;
    }
    extend(A, B);

	var  b = new B();
	console.log(b.x, b.y);
}

bar();

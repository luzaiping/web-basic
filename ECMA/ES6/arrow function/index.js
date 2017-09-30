/*function Parent () {}

Parent.prototype.prefixArray = function (arr) {
    return arr.map( a => {
        console.log(arguments); // arguments is lexical
        return `${this.prefix} ${a}`; // this is also lexical
    });
};

Prefixer.prototype = new Parent();
Prefixer.prototype.constructor = Prefixer;

function Prefixer (prefix) {
    this.prefix = prefix;
}

let p = new Prefixer('hi');
p.prefixArray(['vincent', 'felix']);*/

// const test = () => { return 2 };

// console.log(test()); 
this.x = 3
let obj = { x: 2 }
const nestThis = () => {
	console.log(`n: ${this.x}`)
	let nn = () => {
		console.log(`nn: ${this.x}`)
		let nnn = () => {
			console.log(`nnn: ${this.x}`)

			function some() {
				console.log('some: ' + this.x)
			}
			obj.c = some
			obj.c()
		}
		nnn()


	}
	nn()
}

obj.method = nestThis

obj.method2 = function () {
	console.log(`==============:${this.x}`)
	nestThis()	
}

// obj.method()
obj.method2()
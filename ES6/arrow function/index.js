function Parent () {}

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
p.prefixArray(['vincent', 'felix']);

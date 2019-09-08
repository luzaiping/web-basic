class Animal {

    constructor() {
        this.type = 'animal'
    }

    say(msg = 'hello') {
        // ES5 solution for this in setTimeout function.
        // var self = this;
        // setTimeout(function() {
        // 	console.log(this.type + ' say ' + message);
        // }.bind(this), 100);

        setTimeout(() => { // arrow function contains not this keyword
            console.log(this.type + ' say ' + msg)
        })
    }
}

let animal = new Animal()
animal.say()

class Cat extends Animal {
    constructor() {
        super() // this is required for subclass
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.say()


// let dog = 'Sandy';
// let cat = 'Felix';

// // let zoo = {cat: cat, dog: dog};
// let zoo = {dog, cat};

// console.log(zoo);

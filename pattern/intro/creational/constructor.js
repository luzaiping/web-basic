/**
 * constructor pattern is belonged to creational pattern
 * this is class-based creational design pattern.
 * Constructors are special function that can be used to instantiate
 * new obejcts with methods and properties defined by that function.
 * It is not one of the classic design pattern.
 */
// traditional Function-based syntax
function Hero (name, specialAbility) {
  this.name = name;
  this.specialAbility = specialAbility;

  this.getDetails = function () {
    return this.name + ' can ' + this.specialAbility;
  }
}

class Hero2 {
  constructor(name, specialAbility) {
    this.name = name;
    this.specialAbility = specialAbility;

    this.getDetails = function() {
      return `${this.name} can ${this.specialAbility}`;
    }
  }
}

const IronMan = new Hero('Iron Man', 'fly');
console.log(IronMan.getDetails)

const AmericaCaptain = new Heros2('American Captain', 'fight')
/**
 * this is a structural design pattern.
 * add behaviour or functionalities to
 * existing classes dynamic.
 * 
 * 可以对class的某个方法进行增强，也可以对class进行增强
 */

class Book {
  constructor(title, author, price) {
    this.title = title;
    this.author = author;
    this.price = price;
  }

  getDetails() {
    return `${this.title} by ${this.author}`
  }
}

function giftWrap(book) {
  book.isGiftWrapped = true;
  book.unwrap = function () {
    return `Unwrapped ${book.getDetails()}`
  }

  return book;
}

function hardbindBook(book) {
  book.isHardbound = true;
  book.price += 5;
  return book;
}

const alchemist = giftWrap(new Book('The Alchemist', 'Paulo Coelho', 10));
console.log(alchemist.isGiftWrapped);
console.log(alchemist.unwrap());

const inferno = hardbindBook(alchemist);
console.log(inferno.isHardbound);
console.log(inferno.price); 
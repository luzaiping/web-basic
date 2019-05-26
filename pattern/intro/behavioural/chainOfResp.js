// 这是一个 behavioural design pattern. 提供一组对象组成链式，每个对象可以选择
// 执行或处理 request of client

function ShoppingCart() {
  this.products = [];

  this.addProduct = function(p) {
    this.products.push(p);
  }
}

function Discount() {
  this.calc = function(products) {
    // 这边通过每个具体 discount 设置下一个 next discount，从而形成 chain
    var numberDiscount = new NumberDisount();
    var priceDiscount = new PriceDiscount();
    var noneDiscount = new NoneDiscount();

    numberDiscount.setNext(priceDiscount);
    priceDiscount.setNext(noneDiscount);

    return numberDiscount.exec(products); // 按顺序执行chain
  }
}

function NumberDisount() {
  this.next = null;
  this.setNext = function(discount) {
    this.next = discount;
  }

  this.exec = function(products) {
    var result = 0;
    if (products.length > 0) {
      result = 0.05;
    }

    return result + this.next.exec(products); // 调用chain里的下一个object
  }
}

function PriceDiscount() {
  this.next = null;
  this.setNext = function(discount) {
    this.next = discount;
  }
  this.exec = function(products) {
    var result = 0;
    var total = products.reduce(function(a,b) {
      return a.price + b.price;
    })
    if (total > 500) {
      result = 0.1;
    }
    return result + this.next.exec(products);
  }
}

function NoneDiscount() {
  this.exec = function(products) {
    return 0;
  }
}

let cart = new ShoppingCart();
cart.addProduct({name: 'tony', price: 300})
cart.addProduct({name: 'shoes', price: 400})
cart.addProduct({name: 'iphone', price: 1400})

let discount = new Discount()
console.log(discount.calc(cart.products));


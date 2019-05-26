/**
 * structural design pattern
 */

function networkFetch(url) {
  return `${url} - Response from network.`;
}

const cache = []
const proxiedNetworkFetch = new Proxy(networkFetch, {
  apply(target, thisArg, args) {
    const urlParam = args[0];
    if (cache.includes(urlParam)) {
      return `${urlParam} - Response from cache.`
    } else {
      cache.push(urlParam);
      return Reflect.apply(target, thisArg, args)
    }
  }
})

console.log(proxiedNetworkFetch('dogPic.jpg'));
console.log(proxiedNetworkFetch('dogPic.jpg'));

// https://github.com/fbeline/design-patterns-JS/blob/master/docs.md
function Car() {
  this.drive = function() {
    return 'driving';
  }
}

function CarProxy(driver) {
  this.driver = driver;
  this.drive = function() {
    if (driver.age < 18) {
      return 'too young to drive.'
    }
    return new Car().drive() // new Car() 是被代理对象
  }
}

function Driver(age) {
  this.age = age
}

let proxy = new CarProxy(new Driver(17));
console.log(proxy.drive());
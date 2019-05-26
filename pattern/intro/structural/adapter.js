/**
 * 属于 structural pattern
 * 用于转换接口。adapter 持有新接口的对象实例, adapter要实现跟
 * 旧接口一样的方法, 在方法里调用 新接口的方法
 */

class OldCalculator {
  constructor() {
    this.operations = function(term1, term2, operation) {
      switch(operation) {
        case 'add':
          return term1 + term2;
        case 'sub':
          return term1 - term2;
        default:
          return 0;
      }
    }
  }
}

class NewCalculator {
  constructor() {
    this.add = function (term1, term2) {
      return term1 + term2;
    }
    this.sub = function (term1, term2) {
      return term1 - term2;
    }
  }
}

class CalAdapter {
  constructor() {
    let cal = new NewCalculator();
    this.operations = function(term1, term2, operation) {
      switch(operation) {
        case 'add':
          return cal.add(term1, term2);
        case 'sub':
          return cal.sub(term1, term2);
        default:
          return 0
      }
    }
  }
}

const oldCal = new OldCalculator()
console.log(oldCal.operations(1, 2, 'add'));

const newCal = new NewCalculator()
console.log(newCal.add(1, 2));

const adapter = new CalAdapter()
console.log(adapter.operations(1, 2, 'add'));
/**
 * behavioural design pattern
 * defines one to many dependencies between objects.
 * when subject change its state, all the dependent subscribes
 * are notified and updated automatically. it is also called Pub/Sub
 */

class Subject {
  constructor() {
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer)
  }

  unSubscribe(observer) {
    this.observers = this.observers.filter(function(item) {
      return item !== observer
    })
  }

  notify(change) {
    this.observers.forEach(function(item) {
      item.update(change)
    })
  }
}

class Observer {
  constructor(state) {
    this.state = state;
    this.initialState = state;
  }

  update(change) {
    let state = this.state;
    switch(change) {
      case 'INC':
        this.state = state + 1;
        break;
      case 'DEC':
        this.state = state - 1;
        break;
      default:
        this.state = this.initialState
    }
  }
}

let subject = new Subject()
let obj1 = new Observer(1)
let obj2 = new Observer(2)

subject.subscribe(obj1)
subject.subscribe(obj2)

subject.notify('INC')

console.log(obj1.state)
console.log(obj2.state)
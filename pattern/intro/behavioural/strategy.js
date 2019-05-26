/**
 * It is a behaviour design pattern.
 * It defines a family of algorithms and encapsulates them in such a way
 * that they are interchangeable at runtime without client interference or knowledge
 * 
 * 定义一组算法实现，并将每一个算法封装起来，使每个算法可以相互代替，使得算法本身和算法的客户端分割开来，相互独立
 * 定义一个算法接口，还有一组具体算法；定义一个 算法context 引用 算法接口，在 context 的method里引用算法方法
 */

class Commute {
  setVehicel(Vehicle) {
    this.Vehicle = Vehicle;
  }
  travel() {
    return this.Vehicle.travelTime();
  }
}

class Vehicle {
  travelTime() {
    console.log(`default logger`)
  }
}

class Bus extends Vehicle {
  travelTime() {
    console.log('Bus go quickly!')
  }
}

class Taxi extends Vehicle {
  travelTime() {
    console.log('Taxi go faster than Bus')
  }
}

class PersonalCar extends Vehicle {
   travelTime() {
     console.log('PersonalCar go fastest!')
   }
}

let commute = new Commute()
commute.setVehicel(new Bus())
commute.travel()

commute.setVehicel(new Taxi())
commute.travel()
commute.setVehicel(new PersonalCar())
commute.travel()
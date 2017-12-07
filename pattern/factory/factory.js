/**
 * Created by Administrator on 2016/11/29.
 */

function Car(options) {
    this.doors = options.doors || 4;
    this.state = options.state || 'brand new';
    this.color = options.color || 'silver';
}

function Truck(options) {
    this.state = options.state || 'used';
    this.wheelSize = options.wheelSize || 'large';
    this.color = options.color || 'blue';
}

function VehicleFactory() {}

VehicleFactory.prototype.vehicleType = Car;
VehicleFactory.prototype.createVehicle = function (options) { // factory method
    switch (options.vehicleType) {
        case 'car':
            this.vehicleType = Car;
            break;
        case 'truck':
            this.vehicleType = Truck;
            break;
    }
    return new this.vehicleType(options);
};

var vehicleFactory = new VehicleFactory();
var car = vehicleFactory.createVehicle({
    vehicleType: 'car',
    state: 'used',
    color: 'black'
});
console.log(car instanceof Car);

var truck = vehicleFactory.createVehicle({
    vehicleType: 'truck',
    color: 'white'
});
console.log(truck instanceof Truck);

function TruckFactory() {}
TruckFactory.prototype = vehicleFactory;
TruckFactory.prototype.constructor = TruckFactory;
TruckFactory.prototype.vehicleType = Truck;
var truckFactory = new TruckFactory();
var myTruck = truckFactory.createVehicle({
    color: 'black'
});
console.log(myTruck instanceof Truck);
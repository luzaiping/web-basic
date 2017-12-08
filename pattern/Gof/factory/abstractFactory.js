function Parent(){}

Parent.prototype = {
    drive: function() {
        console.log('go well.')
    },
    breakdown: function() {
        console.log('break down.')
    }
}

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

let parent = new Parent()
Car.prototype = parent
Truck.prototype = parent

let abstractVehicleFactory = (function() {
    let types = {}

    return {
        getVehicle: function (type, options) {
            let Vehicle = types[type]
            return Vehicle ? new Vehicle(options) : null
        },
        registerVehicle: function (type, Vehicle) {
            let proto = Vehicle.prototype
            if (proto.drive && proto.breakdown) {
                types[type] = Vehicle
            }
        }
    }
})()

abstractVehicleFactory.registerVehicle('car', Car)
abstractVehicleFactory.registerVehicle('truck', Truck)

let car = abstractVehicleFactory.getVehicle('car', {
    doors: 2,
    color: 'red'
})

car.drive()
car.breakdown()

let truck = abstractVehicleFactory.getVehicle('truck', {
    color: 'red'        
})
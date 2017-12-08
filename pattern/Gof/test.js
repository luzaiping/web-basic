function singletonTest() {
    let Singleton = (function() {
        
        let instance
    
        function init() {
            let privateVariable = ''
            let randomNumber = Math.random()
    
            return {
                publicProperty: 'I am public to global.',
                getRandomNumber: function() {
                    return randomNumber
                },
                publicMethod: function() {
                    console.log('I am public too.')
                }
            }
        }
    
        return {
            getInstance: function() {
                if (!instance) {
                    instance = init()
                }
                return instance
            }
        }
    })()
    
    let instance = Singleton.getInstance()
    let instance2 = Singleton.getInstance()
    console.log(instance === instance2)
    console.log(instance.getRandomNumber() === instance2.getRandomNumber())
}

function factoryTest() {

    function Vehicle() {}

    Vehicle.prototype = {
        constructor: Vehicle,
        drive: function() {
            console.log('Vehicle can drive.')
        },
        dropDown: function() {
            console.log('It drop down, babababa...')
        }
    }

    let vehicle = new Vehicle()

    function Car({name = 'car', doors = 4, color = 'blue'}) {
        this.name = name
        this.doors = doors
        this.color = color
    }

    function Truck({name = 'truck', wheelSize = 'large', color = 'green'}) {
        this.name = name
        this.wheelSize = wheelSize
        this.color = color
    }

    Car.prototype = vehicle
    Truck.prototype = vehicle

    function Factory() {}
    Factory.prototype.vehicleType = Car
    Factory.prototype.createVehicle = function(options = {}) {
        switch (options.type) {
            case 'car':
                this.vehicleType = Car
                break
            case 'truck':
                this.vehicleType = Truck
                break
        }

        return new this.vehicleType(options)
    }

    let factory = new Factory()

    let car = factory.createVehicle({
        doors: 2,
        color: 'red'
    })

    let truck = factory.createVehicle({
        type: 'truck'
    })

    console.log(car)
    console.log(truck)

    function TruckFactory() { }
    TruckFactory.prototype = factory
    TruckFactory.prototype.constructor = TruckFactory
    TruckFactory.prototype.vehicleType = Truck

    let truckFactory = new TruckFactory()
    let truck2 = truckFactory.createVehicle()
    console.log(truck2)
}

factoryTest()
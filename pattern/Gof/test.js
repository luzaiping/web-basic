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

let moment = require('moment')
let HmacSHA256 = require('crypto-js/hmac-sha256')
let Base64 = require('crypto-js/enc-base64')

// let dateString = `${moment().utcOffset(0).format('ddd, DD MMM YYYY HH:mm:ss')} GMT`

function buildProxyAuth(serverPath = '', gatewayUrl = '', appKey, secret, method='') {
    let gatewayPath = getPath(gatewayUrl)
    let path = `${gatewayPath}${serverPath}`
    let dateString = `${moment().format('ddd, DD MMM YYYY HH:mm:ss')} GMT`
    let toEncodeStr = `date: ${dateString}\n${method.toUpperCase()} ${path} HTTP/1.1`
    let shaStr = HmacSHA256(toEncodeStr, secret)
    let signature = shaStr.toString(Base64)
    
    return `Proxy-Authorization：hmac username="${appKey}", algorithm="hmac-sha256", headers="date request-line", signature="${signature}"`
}

function getPath(url) {
    let pos = url.indexOf('://')
    let path = pos > -1 ? url.substring(pos + 3) : url
    let hostIndex = path.indexOf('/')
    let host = path.substr(0, hostIndex)
    path = path.substring(hostIndex)
    let queryIndex = path.indexOf('?')
    return queryIndex > -1 ? path.substring(0, queryIndex) : path
}

// console.log(getPath('localhost:3030/#/apis/debug/556ddd0f-d76d-4d9f-a1cd-86ac9312e27f/GET/dyu?path=/v0.1/addresses&_k=brmfxz'))
// console.log(buildProxyAuth('/v0.1/addresses', '192.168.70.184:10000/transaction', 'alice123', 'secret', 'GET'))

function ddd() {
    let str =  '{"name": 1}'
    JSON.parse(str, (key, value) => {
        console.log(key, value)
    })
}

ddd()
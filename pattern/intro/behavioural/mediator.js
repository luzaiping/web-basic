
class TrafficTower {
  constructor() {
    this.airplanes = [];
  }

  register(airplane) {
    this.airplanes.push(airplane);
  }

  requestCoordinate(airplane) {
    return this.airplanes.filter(function(item) {
      
    })
  }
}

class Airplane {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.trafficTower = null;
  }

  register(trafficTower) {
    this.trafficTower = trafficTower;
  }
}
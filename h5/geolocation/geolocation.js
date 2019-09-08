function whereami() {
	console.log('start...');
	var options = {
		enableHighAccuracy: false, 
		maximumAge: 300000, // how long the location data should be cached.
		timeout: 15000 // wait at most 15 seconds until getCurrentPosition() false
	};

	var geolocation = navigator.geolocation;

	if(geolocation) {
		geolocation.getCurrentPosition(success, error, options);
	} else {
		console.log('Geolocation is not supported in this browser.');
	}

	function success(position) {
		var coords = position.coords;
		var msg = "At " + new Date(position.timestamp).toLocaleString() + " you were within " + coords.accuracy
				   + ' metres of latitude ' + coords.latitude + ' longitude ' + coords.longitude;

		if (coords.altitude) {
			msg += " You are " + coords.altitude + " ± " + coords.altitudeAccuracy + "meters above sea level.";
		}
		// if our device returns speed and heading, add that, too.
		if (coords.speed) {
			msg += " You are travelling at " + coords.speed + "m/s on heading " + coords.heading + ".";
		}
		console.log(msg);
	}

	function error(e) {
		console.log('Geolocation error ' + e.code + ':' + e.message);
	}
}

whereami();
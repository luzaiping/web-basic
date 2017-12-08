RCM.Events = function() {

	var listeners = {}; 

	function addEventListener(eventName, handler) {
		var callbacks = listeners[eventName];  // each eventName have multiple callbacks
		if(callbacks) {
			callbacks.forEach(function(callback) {
				if(callback === handler) return;
				callbacks.push(handler);
			});
		} else {
			listeners[eventName] = [ handler ];
		}
	}

	function removeEventListener(eventName, handler) {
		var callbacks = listeners[eventName];
		if(callbacks) {
			for(var i=0; i<callbacks.length; i++) {
				if(callbacks[i] === handler) {
					callbacks.splice(i, 1);
					return;
				}
			}
		}
	}

	function fireEventListener(eventName, options) {
		var callbacks = listeners[eventName];
		if(callbacks) {
			callbacks.forEach(function(callback) {
				if(typeof callback === 'function') {
					callbacks(options);
				}
			});
		}
	}

	return {
		createEventSource: function() {
			return {
				addEventListener: addEventListener,
				removeEventListener: removeEventListener,
				fireEventListener: fireEventListener
			}
		},
		extendToEventSource: function(obj) {
			obj = obj || {};
			var eventSource = createEventSource();
			for(var key in eventSource)	 {
				if(eventSource.hasOwnProperty(key)) {
					obj[key] = eventSource[key];
				}
			}
		}
	}
}();
var EventEmitter = require('events');

EventEmitter.defaultMaxListeners = 10; // change defaultMaxListeners for all EventEmitter instances.

var emitter = new EventEmitter();
emitter.setMaxListeners(11); // change defaultMaxListeners for single EventEmitter instance

emitter.on( 'foo', (a, b) => {console.log(a, b, this)} );
emitter.on( 'foo', function (a, b) {console.log(a, b, this)} );
emitter.on( 'bar', () => {
	setImmediate(() => {
		console.log('this happends async');
	});
	console.log('bar...');
});


const symbol = Symbol('symbol');

emitter.on(symbol, () => {});

var eventNamesArr = emitter.eventNames(); // return eventNames array that are registered into current emitter instance.
var listenerCount = emitter.listenerCount('foo'); // return number of listeners regisited into specified eventName.
var listeners = emitter.listeners('foo'); // return listerns array registered into specified eventName


const test = () => {
	let eventName = 'test';

	emitter.on(eventName, () => {
		console.log('test one');
	});
	emitter.once(eventName, () => {
		console.log('test once');
	});
	emitter.prependListener(eventName, () => {
		console.log('test prepend');
	});
	emitter.prependOnceListener(eventName, () => {
		console.log('test prepend once');
	});

	emitter.emit(eventName);
	console.log('===============');
	emitter.emit(eventName);
};


// emitter.emit('foo', '1', '2');
// emitter.emit('bar');

// emitter.on('error', (error) => { console.log('whoops! there was an error') });
// emitter.emit('error', new Error('whoops!'));

emitter.once('newListener', (eventName, listener) => {
	if( eventName === 'bar' ) {
		console.log('bar is ready to add');
	}
});
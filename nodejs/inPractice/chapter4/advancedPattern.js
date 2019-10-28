/* eslint-disable no-unused-vars */
/**
 * U need to catch when a listener has been added to an emitter
 * or query the existing listeners.
 */
const eventTracker = () => {
  const util = require('util');
  const events = require('events');

  function EventTracker() {
    events.EventEmitter.call(this);
  }

  util.inherits(EventTracker, events.EventEmitter);

  const tracker = new EventTracker();
  tracker.on('newListener', function(name, listener) { // newListener name is used internally by Node
    console.log('Event name %s is added.', name);
  });

  tracker.on('play', function() {
    // This will cause 'newListener' to fire.
  })
};
// eventTracker();

const automaticallyTrigger = () => {
  const util = require('util');
  const events = require('events');

  const TARGET_EVENT_NAME = 'pluse';

  function Pulsar(speed, times) {
    events.EventEmitter.call(this);

    this.speed = speed;
    this.times = times;

    this.on('newListener', (eventName) => {
      if (eventName === TARGET_EVENT_NAME) {
        this.start();
      }
    });
  }

  util.inherits(Pulsar, events.EventEmitter);

  Pulsar.prototype.start = function() {
    const id = setInterval(() => {
      this.emit(TARGET_EVENT_NAME);
      this.times--;
      if (this.times === 0) {
        clearInterval(id);
      }
    }, this.speed);
  };

  Pulsar.prototype.stop = function () {
    if (this.listeners(TARGET_EVENT_NAME).length === 0) {
      throw new Error('No listeners have been added!');
    } else {
      console.log('going....');
    }
  };

  const pular = new Pulsar(500, 5);
  pular.on(TARGET_EVENT_NAME, () => {
    console.log('.');
  });

  pular.stop();

};
automaticallyTrigger();
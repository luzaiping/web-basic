/**
 * You want to use an event-based approach to solve a problem. You have a class that
 * you’d like to operate when asynchronous events occur
 */
const inheritFromEventEmitter = () => {
  const util = require('util');
  const events = require('events');

  function MusicPlayer () {
    this.audioFirstStarted = null;
    this.playing = false;
    events.EventEmitter.call(this);
  }
  util.inherits(MusicPlayer, events.EventEmitter); // util.inherits is the idiomatic way Node way to inherit from prototype classes.
  
  const musicPlayer = new MusicPlayer(); // create a MusicPlayer instance

  musicPlayer.on('play', (track) => {
    this.playing = true;
    console.log('music is playing,the track is:', track);
  });

  musicPlayer.on('stop', () => {
    this.playing = false;
    console.log('music has stopped.');
  });

  musicPlayer.once('play', () => { // only fired with one time
    this.audioFirstStarted = new Date();
  });

  musicPlayer.emit('play', 'The Roots - The Fire');

  setTimeout(() => {
    musicPlayer.emit('stop');
  }, 1000);
}

inheritFromEventEmitter();
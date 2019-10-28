/* eslint-disable no-unused-vars */
/**
 * to prevent EventEmitter from throwing exceptions whenever
 * an error is emitted, add a listener to the error event.
 */
const handleError = () => {
  const util = require('util');
  const events = require('events');
  
  function MusicPlayer () {
    events.EventEmitter.call(this);
  }
  
  util.inherits(MusicPlayer, events.EventEmitter);
  
  const musicPlayer = new MusicPlayer();
  
  musicPlayer.on('play', (track) => {
    console.log('to play: ', track);
    musicPlayer.emit('error', 'unable to play!');
  });
  
  musicPlayer.on('error', (err) => { // 如果没有监听 error 事件，node 默认会打印 stack trace 并且 退出运行
    console.error('Error:', err);
  });
  
  setTimeout(() => {
    musicPlayer.emit('play', 'Little Comets - Jennifer');
  }, 1000);
};
// handleError();

const handleMutipleErrorWithDomain = () => {
  const util = require('util');
  const domain = require('domain');
  const events = require('events');

  const audioDomain = domain.create(); // create a domain instance

  function AudioDevice() {
    events.EventEmitter.call(this);
    this.on('play', this.play.bind(this));
  }

  util.inherits(AudioDevice, events.EventEmitter);

  AudioDevice.prototype.play = function() {
    this.emit('error', 'not implemented yet');
  }

  function MusicPlayer() {
    events.EventEmitter.call(this);

    this.audioDevice = new AudioDevice();
    this.on('play', this.play.bind(this));

    this.emit('error',  'No audio tracks are available');
  }

  util.inherits(MusicPlayer, events.EventEmitter);

  MusicPlayer.prototype.play = function() {
    this.audioDevice.emit('play');
  }

  audioDomain.on('error', function(err) {
    console.log('audioDomain error:', err);
  });

  // run code in domain, any error that are thrown will be caught by the domain.
  audioDomain.run(function() {
    const musicPlayer = new MusicPlayer();
    musicPlayer.emit('play');
  });
};
handleMutipleErrorWithDomain();




var audio = new Audio();
if(audio.canPlayType('audio/wav')) {
	audio.src = 'soundeffect.wav'; // begin loading the file
	audio.play();
}

window.addEventListener('load', setMediaParam, false);

function setMediaParam() {
    var audio = document.getElementById('music'); // assume music is audio/video element.
    audio.currentTime = 5; // skip first 5 seconds.
    audio.volume = 1; // maximum volume.
    audio.playbackRate = 1.0; // play speed

    if(audio.controls) {
        console.log('playback controls are displayed in the browser.');
    }
    if(audio.loop) {
        console.log('play the media over and over again.');
    }

    audio.preload = 'auto'; // pre loading media before playing.
    audio.autoplay = false; // don't play media automatically
}
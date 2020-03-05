function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log('Time is up -- stop');
    callback && callback();
  }, 1000);
}

module.exports = timerGame;

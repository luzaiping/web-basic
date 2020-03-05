const timerGame = require('../timerGame');

// this mocks out setTimeout and other timer
// functions with mock functions.
beforeEach(() => {
  jest.useFakeTimers();
});

describe('Timer Game', () => {
  it('wait 1 second before ending the game.', () => {
    timerGame();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('calls the callback after 1 second.', () => {
    const callback = jest.fn();
    timerGame(callback);

    // At this point in time, the callback
    // should not have been called yet.
    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed.
    jest.runAllTimers();

    // now our callback should have been called.
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

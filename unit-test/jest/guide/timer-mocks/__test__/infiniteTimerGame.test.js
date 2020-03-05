const infiniteTimerGame = require('../infiniteTimerGame');

jest.useFakeTimers();

describe('infiniteTimerGame', () => {
  it('schedules a 10-seconds timer after 1 second', () => {
    const callback = jest.fn();

    infiniteTimerGame(callback);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    jest.runOnlyPendingTimers();

    expect(callback).toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});

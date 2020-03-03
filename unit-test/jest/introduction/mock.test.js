function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test('mock forEach callback', () => {
  // create a mock fn
  const mockCallback = jest.fn(x => 42 + x);
  // call the target with mock fn
  forEach([0, 1], mockCallback);

  // mockCallback.mock.calls.length to get called number.
  expect(mockCallback.mock.calls.length).toBe(2);

  // mockCallback.mock.calls[0] get first call, second [0] get first argument
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // mockCallback.mock.calls[1][0] get first argument of second call
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // mockCallback.mock.results refer to all called results
  // results[0] refers to first call result, it's object.
  expect(mockCallback.mock.results[0].value).toBe(42);

  expect(mockCallback.mock.results[1].value).toBe(43);
});

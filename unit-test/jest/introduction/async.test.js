function fetchData(callback) {
  setTimeout(() => {
    callback('peanut butter');
  }, 100);
}

function fetchDataPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('peanut butter');
    }, 100);
  });
}

function fetchDataRejectedPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('peanut butter');
      reject(new Error('something wrong'));
    }, 100);
  });
}

// Jest will wait until the done callback
// is called before finishing the test.
// If done() is not called, the test will fail(with timeout error)
// this is useful for callback-style async.
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      // after done is called, the test is finished.
      // it's used for async testing.
      done();
    } catch (error) {
      // pass error to done(), if you want to
      // see in the test log for what happens.
      done(error);
    }
  }
  fetchData(callback);
});

// If promise-style async is used, test will wait for
// that promise to resolve.
test('the data is peanut butter using promise', () => {
  // 注意，这边一定要使用 return 返回一个 promise
  // 否则在 fetchDataPromise resolve 或者 then 之前
  // test 就被认为是完成了
  // return fetchDataPromise().then(data => {
  //   expect(data).toBe('peanut butter');
  // });

  // 这句同上面那条语句是一样的效果，使用 resolves
  return expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

// If you expect a promise to be rejected use the .catch method.
// Make sure to add expect.assertions to verify that a certain
// number of assertions are called. Otherwise a fulfilled promise
// would not fail the test.
test('the fetch fails with an error', () => {
  // expect.assertions(1);
  // return fetchDataRejectedPromise().catch(e => {
  //   expect(e).toBeDefined();
  // });

  // 这句效果同上面的语句类似
  return expect(fetchDataRejectedPromise()).rejects.toEqual(
    new Error('something wrong')
  );
});

test('using async await', async () => {
  const result = await fetchDataPromise();
  expect(result).toBe('peanut butter');
});

test('the fetch fails with an error using async/await', async () => {
  try {
    await fetchDataRejectedPromise();
  } catch (error) {
    expect(error).toEqual(new Error('something wrong'));
  }
});

test('combine async/await with .resolves or .rejects', async () => {
  await expect(fetchDataRejectedPromise()).rejects.toThrow('something wrong');
});

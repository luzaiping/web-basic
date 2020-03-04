const user = require('../user');

// this tell jest to use our manaul mock.
jest.mock('../request.js');

describe('User', () => {
  it('works with promise', () => {
    expect.assertions(1);
    // The assertion for a promise must be returned.
    return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
  });

  it('works with resolves', () => {
    expect.assertions(1);
    return expect(user.getUserName(5)).resolves.toEqual('Paul');
  });

  it('works with async/await', async () => {
    expect.assertions(1);
    const data = await user.getUserName(4);
    expect(data).toEqual('Mark');
  });

  it('tests error with promises', () => {
    // make sure to add expect.assertions
    // to verify that a certain number of assertions
    // are called. otherwise a fulfilled promise would
    // not fail the test.
    expect.assertions(1);

    return user.getUserName(2).catch(error => {
      expect(error).toEqual(new Error('User with 2 not found.'));
    });
  });
});

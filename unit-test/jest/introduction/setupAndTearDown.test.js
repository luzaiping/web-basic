let cities = [];

function initializeCityDatabase() {
  cities = ['Vienna', 'San Juan'];
}

function clearCityDatabase() {
  cities = [];
}

function hasCity(value) {
  return cities.includes(value);
}

// return a promise
function initializeCityDatabaseAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['Vienna', 'San Juan']);
    }, 1);
  });
}

// return a promise
function clearCityDatabaseAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([]);
    }, 1);
  });
}

// beforeEach can handle asynchronous code in the same way
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

// one-time setup
// run before beforeEach
beforeAll(() => {
  return initializeCityDatabaseAsync();
});

// one-time setup: run one time for a file
// run after afterEach
afterAll(() => {
  return clearCityDatabaseAsync();
});

test('city database has Vienna', () => {
  expect(hasCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(hasCity('San Juan')).toBeTruthy();
});

test('city database has not CA', () => {
  expect(hasCity('CA')).toBeFalsy();
});

// describe is used to group tests.
// 可以给这个分组里的 tests 单独设置 beforeAll/beforeEach/afterEach/afterAll
describe('Scoped / Nested block', () => {
  console.log('');
});

// using test.only results in only one test to run and ignores all the other.
test.only('this will be the only test that runs.', () => {
  expect(true).toBeTruthy();
});

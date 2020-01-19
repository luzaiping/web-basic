const assert = require('assert');

const square = num => num * num;

const actualValue = square(2);
const expectedValue = 3;

assert(actualValue, 'square() should have returned a value'); // assert is a function aliased from assert.ok
assert.equal(
  actualValue,
  expectedValue,
  'square() did not calculate the corrent value.'
);

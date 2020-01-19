const assert = require('assert');
const util = require('util');

function PermissionError(...args) {
  Error.call(this, args);
}

util.inherits(PermissionError, Error);

function User(name) {
  this.name = name;
  this.permissions = {
    admin: false
  };
}

function loginAdmin(name) {
  const user = new User(name);
  if (!user.permissions.admin) {
    throw new PermissionError('You are not an administrator');
  }
  return user;
}

// 期望 loginAdmin('Alex') 抛出 PermissionError, 如果没有抛出才显示 message
assert.throws(
  () => loginAdmin('Alex'),
  PermissionError,
  'A PermissionError was expected.'
);

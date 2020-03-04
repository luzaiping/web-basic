const request = require('./request');

exports.getUserName = userId => {
  return request(`/users/${userId}`).then(user => user.name);
};

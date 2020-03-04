const users = {
  4: { name: 'Mark' },
  5: { name: 'Paul' }
};

module.exports = function request(url) {
  return new Promise((resolve, reject) => {
    const userId = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(() =>
      users[userId]
        ? resolve(users[userId])
        : reject(new Error(`User with ${userId} not found.`))
    );
  });
};

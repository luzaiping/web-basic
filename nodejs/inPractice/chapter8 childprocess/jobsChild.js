process.on('message', job => {
  for (let i = 0; i < 100000000; i += 1);
  process.send(`finished: ${job}`);
});

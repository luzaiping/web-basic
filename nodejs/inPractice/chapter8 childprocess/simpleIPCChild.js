// when child receives a message, this handler will be called.
process.on('message', msg => {
  console.log('got message from parent: ', msg);
  process.send('hello Dad!'); // send message back to parent
});

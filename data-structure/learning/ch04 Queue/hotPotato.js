const Queue = require('./Queue');

function hotPotato(nameList, num) {
  const queue = new Queue();

  for (let i = 0; i < nameList.length; i += 1) {
    queue.enqueue(nameList[i]);
  }

  let eliminated = '';
  while (queue.size() > 1) {
    for (let i = 0; i < num; i += 1) {
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(`${eliminated} was eliminated from the Hot Potato game.`);
  }

  return queue.dequeue();
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const winner = hotPotato(names, 7);
console.log(`The winner is: ${winner}`);

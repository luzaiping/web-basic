/* eslint-disable no-unused-vars */
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

// 始终要为 EventEmitter 实例监听 error 事件
// 这样一旦有错误发生，才不会导致 nodejs process crash。
function catchError() {
  myEmitter.on('error', err => {
    console.error('whoops! there was an error.', err);
  });

  myEmitter.emit('error', new Error('whoops!'));
}

function newListenerUsage() {
  // 一旦有新 Listener 被添加，就会触发这个监听器
  // eventName: 事件名称
  // listener: 具体事件处理函数
  // 这边有个很细微的注意点：由于 newListener callback 会在添加事件之前被执行
  // 因此在 newListener callback 里监听同一个事件，会更早被添加到事件数组里
  // 这边要注意使用 once 而不是 on，确保 newListener callback 只被执行一次
  // 否则会导致递归调用导致栈溢出
  myEmitter.once('newListener', (eventName, listener) => {
    if (eventName === 'event') {
      console.log(`new listener ${eventName} is added.`, listener);

      myEmitter.on('event', () => {
        console.log('B');
      });
    }
  });

  myEmitter.on('event', () => {
    console.log('A');
  });

  myEmitter.emit('event');

  // prints:
  // B
  // A
}

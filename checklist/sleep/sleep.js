/* eslint-disable no-unused-vars */
/**
 * 实现一个 sleep 函数，比如 sleep(1000), sleep 之后再执行其他事情
 */

function sleepUsingPromise(sleepTime) {
  return new Promise(resolve => setTimeout(resolve, sleepTime));
}

// sleepUsingPromise(1000).then(() => {
//   console.log('sleepUsingPromise');
// });

function* sleepUsingGenerator(sleepTime) {
  yield new Promise(resolve => {
    setTimeout(resolve, sleepTime);
  });
}

// sleepUsingGenerator(1000)
//   .next()
//   .value.then(() => {
//     console.log('sleepUsingGenerator');
//   });

async function sleepUsingAsync(sleepTime) {
  console.log('------------');
  const out = await sleepUsingPromise(sleepTime);
  console.log('2222222222222');
  return out;
}

// sleepUsingAsync().then(() => {
//   console.log('async');
// });

function sleepUsingES5(callback, sleepTime) {
  if (typeof callback === 'function') {
    setTimeout(callback, sleepTime);
  }
}

sleepUsingES5(() => {
  console.log('sleepUsingES5');
}, 1000);

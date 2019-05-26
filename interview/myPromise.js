// 简易版
function MyPromise(executor) {
  let self = this;
  self.status = 'pending'; // 初始状态
  self.value = undefined;  // resolve 的 value
  self.reason = undefined; // reject 的 reason

  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'resolved';
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
    }
  }

  try {
    executor(resolve, reject) // 执行 Promise 的 executor，这个是同步方法，接收 resolve 和 reject 参数
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onFullfilled, onRejected) {
  let self = this;
  switch(self.status) {
    case 'resolved':
      onFullfilled(self.value);
      break;
    case 'rejected':
      onRejected(self.reason);
      break
    default:
  }

}


let promise = new MyPromise(function(resolve, reject) {
  resolve(1)
})

promise.then(function(value) {
  console.log(value)
})

onmessage =  function(e) { // 监听主线程(创建该 worker 的程序) 发送的数据
    console.log('Message received from main script.')
    let { data = [] } = e
    let [firstValue, secondValue] = data 
    let workerResult =  `Result: ${firstValue * secondValue}`
    console.log('Posting message back to main script.', workerResult)
    postMessage(workerResult)
}
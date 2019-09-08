
let myWorker = new Worker('./worker.js') // worker.js 必须跟 main.js 是 same-origin

let firstInput = document.getElementById('first')
let secondInput = document.getElementById('second')
let resultDiv = document.getElementById('result')
let btnElem = document.getElementById('btn')

firstInput.addEventListener('change', function() {
    sendMessage()
    console.log('Message posted to worker from firstInput')
})

secondInput.addEventListener('change', function() {
    sendMessage()
    console.log('Message posted to worker from secondInput')
})

function sendMessage() {
    let firstValue = firstInput.value
    let secondValue = secondInput.value
    console.log('message:', [firstValue, secondValue])
    myWorker.postMessage([firstValue, secondValue]) // 向 webworker 发送 data
}

myWorker.addEventListener('message', function(e) { // 监听 webworker 发送回来的 data
    let { data = '' } = e
    resultDiv.innerHTML = `<H1>${data}</H1>`
})

btnElem.addEventListener('click', function() {
    myWorker && myWorker.terminate() // terminate worker immediately
})
onconnect = function(e) {
    var port = e.ports[0]

    port.onmessage = function(e) {
        let { data = [] } = e
        let [firstValue, secondValue] = data
        var workResult = `Result: ${firstValue * secondValue} `
        port.postMessage(workResult)
    }

}
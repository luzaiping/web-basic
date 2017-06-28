var submitEle = document.getElementById('submit')
var message = document.getElementById('message')
var bar = document.getElementById('bar')
var percent = document.getElementById('percent')

submitEle.addEventListener('click', uploadFile, false)

function uploadFile() {

    let xhr = new XMLHttpRequest()
    
    let url = 'http://malsup.com/jquery/form/file-echo2.php'
    xhr.open('post', url , true)

    xhr.onload = onRequestEnd

    xhr.onerror = onError

    xhr.upload.onprogress = handleProgress

    xhr.upload.onloadstart = uploadStart

    xhr.send(createFormData())

    function createFormData() {
        var fileObj = document.getElementById('file').files[0]
        let data = new FormData()
        data.append('myfile[]', fileObj)
        return data
    }
}

function handleProgress(event) {
    let { total, loaded, lengthComputable } = event

    console.log( `total: ${total}, loaded: ${loaded}, lengthComputable: ${lengthComputable}`)

    if (lengthComputable) {
        let displayValue = Math.round(loaded / total * 100) + "%"
        bar.style.width = displayValue
        percent.innerHTML = displayValue
    }
}

function uploadStart(event) {
    bar.style.width = '0%'
    percent.innerHTML = '0%'
    message.innerHTML = ''
}

function onRequestEnd (event) {
    message.innerHTML = '上传成功'
}

function onError(event) {
    message.innerHTML = '上传失败'
}
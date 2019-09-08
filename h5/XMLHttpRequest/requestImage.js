function fetchImage() {
    let xhr = new XMLHttpRequest()
    
    xhr.open('GET', '../static/img/code.png' , true)
    xhr.responseType = 'blob'
    
    xhr.onload = function () {
        if (this.status === 200) {
            let blob = new Blob([this.response], { type: 'image/png'})
            let url = URL.createObjectURL(blob)
            let target = document.getElementById('blobImage')
            target.src = url
        }
    }
    
    xhr.onerror = function () {
        console.error('something wrong while fetching image.')
    }

    xhr.send()
}
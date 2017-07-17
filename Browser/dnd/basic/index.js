function handleDragStart(e) {
    console.log('start')
    this.style.opacity = 0.4

    dragSrcEl = this
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', this.innerHTML)
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault() // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move'  // See the section on the DataTransfer object.

    return false
}

function handleDragEnter() {
    console.log('enter')
    this.classList.add('over')
}

function handleDragLeave() {
    console.log('leave')
    this.classList.remove('over')  // this / e.target is previous target element.
}

function handleDragEnd() {
    console.log('end')
    Array.prototype.forEach.call(cols, function (col) {
        col.classList.remove('over')
    })
}

function handleDrop(e) {
    console.log('drop')
    if (e.stopPropagation) {
        e.stopPropagation() // stops the browser from redirecting.
    }
    // swap two element
    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML
        this.innerHTML = e.dataTransfer.getData('text/html')
    }
    return false
}

var dragSrcEl = null
var cols = document.querySelectorAll('#columns .column')

Array.prototype.forEach.call(cols, function (col) {
    col.addEventListener('dragstart', handleDragStart, false)
    col.addEventListener('dragenter', handleDragEnter, false)
    col.addEventListener('dragleave', handleDragLeave, false)
    col.addEventListener('dragover', handleDragOver, false)
    col.addEventListener('dragend', handleDragEnd, false)
    col.addEventListener('drop', handleDrop, false)
})
function draw() {
    let canvas = document.getElementById('tutorial')
    let canvasRendingContext2D = canvas.getContext('2d')

    usingLineWidth()

    /**
     * 实现一个画板，只有颜色库，不能设置颜色。通过改变 fillStyle 属性来实现
     */
    function drawPalette() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                canvasRendingContext2D.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)}, 0`
                canvasRendingContext2D.fillRect(25 * j, 25 * i, 25, 25)
            }
        }
    }

    function usingGlobalAlpha() {
        canvasRendingContext2D.fillStyle = '#FD0'
        canvasRendingContext2D.fillRect(0, 0, 75, 75)
        canvasRendingContext2D.fillStyle = '#6C0'
        canvasRendingContext2D.fillRect(75, 0, 75, 75)
        canvasRendingContext2D.fillStyle = '#09F'
        canvasRendingContext2D.fillRect(0, 75, 75, 75)
        canvasRendingContext2D.fillStyle = '#F30'
        canvasRendingContext2D.fillRect(75, 75, 75, 75)
        
        canvasRendingContext2D.fillStyle = '#FFF'
        canvasRendingContext2D.globalAlpha = 0.2

        for (let i = 0; i < 7; i++) {
            canvasRendingContext2D.beginPath()
            canvasRendingContext2D.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2)
            canvasRendingContext2D.fill()
        }
    }

    function usingRgba() {
        canvasRendingContext2D.fillStyle = 'rgb(255, 221, 0)'
        canvasRendingContext2D.fillRect(0, 0, 150, 37.5)

        canvasRendingContext2D.fillStyle = 'rgb(102, 204, 0)'
        canvasRendingContext2D.fillRect(0, 37.5, 150, 37.5)

        canvasRendingContext2D.fillStyle = 'rgb(0, 153, 255)'
        canvasRendingContext2D.fillRect(0, 75, 150, 37.5)

        canvasRendingContext2D.fillStyle = 'rgb(255, 51, 0)'
        canvasRendingContext2D.fillRect(0, 112.5, 150, 37.5)
        
        // Draw semi transparent rectangles
        for (var i = 0; i < 10; i++) {
            canvasRendingContext2D.fillStyle = 'rgba(255, 255, 255, ' + (i + 1) / 10 + ')'
            for (var j = 0; j < 4; j++) {
                canvasRendingContext2D.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5)
            }
        }
    }

    function usingLineWidth() {
        for (let i=0; i<10;i++) {
            canvasRendingContext2D.lineWidth = 1 + i
            canvasRendingContext2D.beginPath()
            canvasRendingContext2D.moveTo(5 + i*14, 5)
            canvasRendingContext2D.lineTo(5 + i*14, 140)
            canvasRendingContext2D.stroke()
        }
    }
}

function draw() {
    let canvas = document.getElementById('tutorial')
    let canvasRendingContext2D = canvas.getContext('2d')

    usingPath2D()

    function drawTwoShape() {
        canvasRendingContext2D.fillStyle = 'rgb(200, 0, 0)'
        canvasRendingContext2D.fillRect(10, 10, 50, 50)
    
        canvasRendingContext2D.fillStyle = 'rgba(0, 0, 200, 0.5)'
        canvasRendingContext2D.fillRect(30, 30, 50, 50)
    }

    function basicUsage() {
        canvasRendingContext2D.fillRect(25, 25, 100, 100)
        canvasRendingContext2D.clearRect(45, 45, 60, 60)
        canvasRendingContext2D.strokeRect(50, 50, 50, 50)
    }
    
    function drawTriangle() {
        canvasRendingContext2D.beginPath()
        canvasRendingContext2D.moveTo(75, 50)
        canvasRendingContext2D.lineTo(100, 75)
        canvasRendingContext2D.lineTo(100, 25)
        canvasRendingContext2D.fill()
    }

    function drawSmile() {
        canvasRendingContext2D.beginPath()

        canvasRendingContext2D.arc(75, 75, 50, 0, Math.PI * 2, true) // 在 (75，75) 这个坐标逆时针画一个半径是 50 像素的圆

        // canvasRendingContext2D.moveTo(110, 75)
        canvasRendingContext2D.arc(75, 75, 35, 0, Math.PI, false) // 在 (75，75) 这个坐标顺时针画一个半径是 35 像素的半圆

        // canvasRendingContext2D.moveTo(65, 65)
        canvasRendingContext2D.arc(60, 65, 5, 0, Math.PI * 2, true) // 在 (60，65) 这个坐标逆时针画一个半径是 5 像素的半圆
        
        // canvasRendingContext2D.moveTo(95, 65)
        canvasRendingContext2D.arc(90, 65, 5, 0, Math.PI * 2, true) // 在 (90，65) 这个坐标逆时针画一个半径是 5 像素的半圆

        canvasRendingContext2D.stroke()
    }

    function drawTwoTriangle() {
        canvasRendingContext2D.beginPath()
        canvasRendingContext2D.moveTo(25, 25)
        canvasRendingContext2D.lineTo(105, 25)
        canvasRendingContext2D.lineTo(25, 105)
        canvasRendingContext2D.fill()  // shaped are automatically closed when a path is filled.

        canvasRendingContext2D.beginPath()
        canvasRendingContext2D.moveTo(125, 125)
        canvasRendingContext2D.lineTo(125, 45)
        canvasRendingContext2D.lineTo(45, 125)
        // canvasRendingContext2D.fill()
        canvasRendingContext2D.closePath() // 这行是必须，否则三角形最后的线不会闭合。如果最后是调用 fill() 那这行可以不用
        canvasRendingContext2D.stroke()
    }

    function drawComplicatedArc() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                canvasRendingContext2D.beginPath()
                let x = 25 + j * 50
                let y = 25 + i * 50

                let radius = 20
                let startAngle = 0
                let endAngle = Math.PI + (Math.PI * j) / 2
                let anticlockwise = i % 2 !== 0 // 偶数行是逆时针，奇数顺时针

                canvasRendingContext2D.arc(x, y, radius, startAngle, endAngle, anticlockwise)

                i > 1 ? canvasRendingContext2D.fill() : canvasRendingContext2D.stroke()
            }
        }
    }

    function drawQuadraticCurves() {
        canvasRendingContext2D.beginPath()
        canvasRendingContext2D.moveTo(75, 25)
        canvasRendingContext2D.quadraticCurveTo(25, 25, 25, 62.5)
        canvasRendingContext2D.quadraticCurveTo(25, 100, 50, 100)
        canvasRendingContext2D.quadraticCurveTo(50, 120, 30, 125)
        canvasRendingContext2D.quadraticCurveTo(60, 120, 65, 100)
        canvasRendingContext2D.quadraticCurveTo(125, 100, 125, 62.5)
        canvasRendingContext2D.quadraticCurveTo(125, 25, 75, 25)
        canvasRendingContext2D.stroke()
    }

    function drawBezierCurve() {
        canvasRendingContext2D.beginPath()
        canvasRendingContext2D.moveTo(75, 40)
        canvasRendingContext2D.bezierCurveTo(75, 37, 70, 25, 50, 25)
        canvasRendingContext2D.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5)
        canvasRendingContext2D.bezierCurveTo(20, 80, 40, 102, 75, 120)
        canvasRendingContext2D.bezierCurveTo(110, 102, 130, 80, 130, 62.5)
        canvasRendingContext2D.bezierCurveTo(130, 62.5, 130, 25, 100, 25)
        canvasRendingContext2D.bezierCurveTo(85, 25, 75, 37, 75, 40)
        canvasRendingContext2D.fill()
    }

    function usingPath2D() {
        let rectangle = new Path2D()
        rectangle.rect(10, 10, 50, 50)

        let circle = new Path2D()
        circle.moveTo(125, 35)
        circle.arc(100, 35, 25, 0, Math.PI * 2)

        canvasRendingContext2D.stroke(rectangle)
        canvasRendingContext2D.fill(circle)

        var p = new Path2D('M10 10 h 80 v 80 h -80 Z')
        canvasRendingContext2D.stroke(p)
    }
}

// radians * 180 = Math.PI * 360
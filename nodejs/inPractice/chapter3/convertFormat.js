let fs = require('fs')
let path = require('path')

function basic() {
  fs.readFile(__filename, function(err, data) {
    if (err) throw err
    console.log(Buffer.isBuffer(data))
    console.log(data.toString()) // convert buffer data to utf-8 encoded string.
  })
}
basic()

function convertToBuffer() {
  let name = 'johnny', password = 'c-bad'
  let originStr = `${name}:${password}`
  let buf = new Buffer(originStr) // convert utf8 encoded string to buffer
  let base64Str = buf.toString('base64') // convert buffer to base64 encoded string.
  // let base64Str = Buffer(originStr).toString('base64') // equals to above two lines.
  console.log(base64Str)

}
convertToBuffer()

function constructDataURI() {
  let mimeType = 'image/png'
  let encoding = 'base64'
  let fileName = path.resolve(__dirname, 'ES6.png')
  let data = fs.readFileSync(fileName).toString(encoding)
  return `data:${mimeType};${encoding},${data}`
}

function createNewImage(uri) {
  let data = uri.split(',')[1]
  let buffer = new Buffer(data, 'base64')
  let newFileName = path.resolve(__dirname, 'secondES6.png')
  fs.writeFileSync(newFileName, buffer)
}

createNewImage(constructDataURI())

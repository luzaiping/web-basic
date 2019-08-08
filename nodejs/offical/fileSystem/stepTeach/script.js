/**
 * 定时获取当前需要重新打包的应用及其应用信息(包括router, componentName)
 * 
 * 1、将应用 id 保存到 config.js 文件里，这样就是全局可用
 * 2、根据组件信息，生成 routers.js 文件
 * 3、根据路由信息，生成 reducer/index.js，只包含相关组件的 reducers
 * 4、执行 webpack 打包的 npm script
 * 
 * 把这个文件存放到根目录下，即跟 package.json 一个目录，这样可以直接执行 npm script
 */

let fs = require('fs')
const { spawn } = require('child_process')
const npmCommand = /^win/.test(process.platform) ? 'npm.cmd' : 'npm'

let data = `
//import CourseSmart from '../../course/container/courseSmart.js'

let str = 'aaa'

console.log(str)
`

let fileName = `${__dirname}/data/test.js`

fs.writeFile(fileName, data, error => {
    if (error) throw error
    console.log('The "data to append" was appended to file!')

    runBuild()
})

function runBuild() {
    var runBuild = spawn(npmCommand, ['run', 'build'])
    runBuild.on('error', function(err) {
        console.error(err)
        process.exit(1)
    })
}
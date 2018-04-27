require('./module')

console.log(__dirname) // 当前文件的路径, 跟执行文件的路径无关，即不管在哪里调用到这个文件，这个显示的是实际的物理路径
console.log(__filename) // 当前文件的完整文件路径，跟__dirname类似，只是后面多了文件名称而已

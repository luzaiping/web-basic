function MyPlugin() {

}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    compilation.chunks.forEach(function(chunk)  {
      
      chunk.forEachModule(function(module) {
        module.fileDependencies.forEach(function(filePath) {
          
        })
      });

      chunk.files.forEach(function(filename) {
        var source = compilation.assets[filename].source()
      })

    });
  })
}

module.exports = MyPlugin;
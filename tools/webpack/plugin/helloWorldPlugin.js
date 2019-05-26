function HelloWorldPlugin() {

}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compile', function(params) {
    console.log('The compiler is starting to compile...');
  })

  compiler.plugin('done', function() { // 
    console.log('Hello World!');
  })

  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');

    compilation.plugin('optimize', function() {
      console.log('Assets are being optimized.');
    })
  })

  compiler.plugin('emit', function(compilation, callback) {
    console.log('The compilation is going to emit files...');
  })
}
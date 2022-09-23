/**
 * 这个是 webpack 核心入口文件
 */

const webpack = require('./webpack');
const config = require('../examples/webpack.config');

// calling webpack function to create compiler instance.
// webpack is role as factory function.
const compiler = webpack(config);

// after created, we could call compiler.run to start bundling process.
compiler.run(err => {
  if (err) {
    console.error(err, 'err');
  }
});

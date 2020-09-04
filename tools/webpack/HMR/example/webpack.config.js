const path = require('path');
// const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/')
  },
  devServer: {
    hot: true // 这边配置 hot: true 并且在 package.json 中指定 webpack-dev-server --hot --open, devServer 会告诉webpack自动引入 HotModuleReplacementPlugin，这样就无需手动引入
  }
};

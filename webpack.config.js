const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    hot: true,
    compress: true,
    port: 9000,
  },
  watchOptions: {
    poll: true,
    ignored: '/node_modules/',
  },
};
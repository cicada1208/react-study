console.log("process.env.NODE_ENV(webpack.config.dev): " + process.env.NODE_ENV);

const Path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.com.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: Path.resolve(__dirname, 'dist'),
    port: 8008,
    inline: true,
    open: true
  }
});

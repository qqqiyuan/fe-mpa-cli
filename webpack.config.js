var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var entryFiles = { };
var entryDir = '/src/pages';

var files = fs.readdirSync(__dirname + entryDir);
files.forEach(function (item) {
  entryFiles[item] = '.' + entryDir + '/' + item + '/' + item + '.js';
});

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  debug: true,

  entry: entryFiles,

  output: {
    // path: './dist/pages',
    filename: '[name]/[name].min.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel-loader',
        test: /\.(less|css)$/, loader: 'style!css!less'
      }      
    ]
  },

  devtool: "source-map",

};

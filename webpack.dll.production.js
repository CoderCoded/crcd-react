var path = require('path')
var webpack = require('webpack')
var outputPath = path.resolve(__dirname, 'build/static/dist')

// Change output path
var webpackDllConfig = require('./webpack.dll.js')
webpackDllConfig.output.path = outputPath

webpackDllConfig.devtool = 'hidden-source-map'

// Add plugins
webpackDllConfig.plugins = [
  // optimizations
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]

module.exports = webpackDllConfig

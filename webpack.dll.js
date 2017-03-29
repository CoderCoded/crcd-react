var path = require('path')
var webpack = require('webpack')
var outputPath = path.resolve(__dirname, './.tmp/static/dist')

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    vendors: [path.join(__dirname, 'src', 'client', 'vendors.js')]
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    library: '[name]'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.join(__dirname, 'node_modules', 'quick-format-unescaped'), // This package doesn't support browser
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, 'src', 'client')
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src', 'client'), 'node_modules']
  }
}

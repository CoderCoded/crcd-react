var path = require('path')
var webpack = require('webpack')
var outputPath = path.resolve(__dirname, './.tmp/static/dist')

module.exports = {
  devtool: 'source-map',
  entry: {
    vendors: [path.join(__dirname, 'src', 'client', 'vendors.js')]
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, 'src', 'client')
    })
  ],
  resolve: {
    root: path.resolve(__dirname, 'src', 'client'),
    modulesDirectories: ['node_modules']
  }
}

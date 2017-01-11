// Webpack config for creating the production bundle.
var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var AssetsPlugin = require('assets-webpack-plugin')
var strip = require('strip-loader')

var relativeOutputPath = './build/static/dist'
var outputPath = path.join(__dirname, relativeOutputPath)

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    'main': './src/client/app.js'
  },
  output: {
    path: outputPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[id]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [strip.loader('debug'), 'babel']
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.html$/,
        exclude: path.join(__dirname, 'node_modules'),
        loader: 'html'
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url?limit=10000?hash=sha512&digest=hex&name=[hash].[ext]'
      }, {
        test: /\.woff(2)?(\?.*)?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?.*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src/client',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [

    new CleanPlugin([relativeOutputPath]),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // optimizations
    new webpack.optimize.CommonsChunkPlugin('commons', 'commons-[hash].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // assets in json file
    new AssetsPlugin({filename: 'webpack-assets.json'})
  ],
  postcss: [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('precss')(),
    require('autoprefixer')({ browsers: 'last 2 versions' })
  ]
}

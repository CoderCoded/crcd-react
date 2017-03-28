// Webpack config for creating the production bundle.
var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var AssetsPlugin = require('assets-webpack-plugin')

var relativeOutputPath = './build/static/dist'
var outputPath = path.join(__dirname, relativeOutputPath)

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    'main': './src/client/main.production.js'
  },
  output: {
    path: outputPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[id]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.join(__dirname, 'node_modules'),
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.html$/,
      exclude: path.join(__dirname, 'node_modules'),
      use: [{
        loader: 'html-loader'
      }]
    }, {
      test: /\.ya?ml$/,
      exclude: path.join(__dirname, 'node_modules'),
      use: [{
        loader: 'json-loader'
      }, {
        loader: 'yaml-loader'
      }]
    }, {
      test: /\.css$/,
      exclude: path.join(__dirname, 'node_modules'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader'
        }]
      })
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          hash: 'sha512',
          digest: 'hex',
          name: '[hash].[ext]'
        }
      }]
    }, {
      test: /\.woff(2)?(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/font-woff'
        }
      }]
    }, {
      test: /\.(ttf|eot|svg)(\?.*)?$/,
      use: [{
        loader: 'file-loader'
      }]
    }]
  },
  resolve: {
    modules: [
      'src/client',
      'node_modules'
    ],
    extensions: ['.json', '.js'],
    alias: {
      'socket.io-client': 'socket.io-client/dist/socket.io.js'
    }
  },
  plugins: [

    new CleanPlugin([relativeOutputPath]),

    new webpack.ProvidePlugin({
      riot: 'riot'
    }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      APP_NAME: 'heu-rs-form'
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
    new webpack.optimize.CommonsChunkPlugin({name: 'commons', filename: 'commons-[hash].js'}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // assets in json file
    new AssetsPlugin({filename: 'webpack-assets.json'})
  ]
}

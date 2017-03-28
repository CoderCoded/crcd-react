var path = require('path')
var webpack = require('webpack')
var outputPath = path.resolve(__dirname, './.tmp/static/dist')
var host = process.env.HOST || 'localhost'
var port = parseInt(process.env.PORT, 10) || 3001

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    'main': [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/client/main.js'
    ]
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    chunkFilename: '[name]-[id].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
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
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader'
      }]
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

    new webpack.DllReferencePlugin({
      context: './src/client',
      manifest: require('./dll/vendors-manifest.json')
    }),

    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/\.json$/),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'commons', filename: 'commons.js'})

  ]
}

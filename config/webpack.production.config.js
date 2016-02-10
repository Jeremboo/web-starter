var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var node_modules_dir = path.resolve(__dirname, '../node_modules');

module.exports = {
  entry:{
    app: path.resolve(__dirname, '../app/main.js'),
    vendors: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      },
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass!postcss'
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'file?name=img/[name].[ext]',
    },
    {
      test: /\.(eot|svg|ttf|woff)$/,
      loader: 'file?name=fonts/[name].[ext]',
    }]
  },
  postcss: function () {
      return [require('autoprefixer')];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlWebpackPlugin({
      template: './app/assets/index.html'
    })
  ]
};

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var poststylus = require('poststylus');

var node_modules = path.resolve(__dirname, '../node_modules');

module.exports = {
  entry:{
    app: path.resolve(__dirname, '../app/main.js'),
    vendors: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: node_modules,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
        plugins: [
          [ "module-alias", [
            { src: path.resolve(__dirname, '../app/assets'), expose: "assets"},
            { src: path.resolve(__dirname, '../app/components'), expose: "components"},
            { src: path.resolve(__dirname, '../app/core'), expose: "core"},
            { src: path.resolve(__dirname, '../app/style'), expose: "style"},
            { src: path.resolve(__dirname, '../app/views'), expose: "views"},
          ]]
        ]
      },
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.styl$/,
      loader: 'style!css!stylus'
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'file?name=imgs/[name].[ext]',
      include: path.resolve(__dirname, '../app/assets/imgs')
    },
    {
      test: /\.json$/,
      loader: 'json',
      include: path.resolve(__dirname, '../app/assets/')
    },
    {
      test: /\.(eot|svg|ttf|woff)$/,
      loader: 'file?name=fonts/[name].[ext]',
      include: path.resolve(__dirname, '../app/assets/fonts')
    }]
  },
  stylus: {
    use: [
      poststylus(['autoprefixer'])
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlWebpackPlugin({
      template: './app/assets/index.html'
    })
  ]
};

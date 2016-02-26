var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var poststylus = require('poststylus');

var node_modules = path.resolve(__dirname, '../node_modules');

var deps = [
  'react/dist/react-with-addons.min.js',
  'react-dom/dist/react-dom.min.js'
];

var config = {
    entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, '../app/main.js')
    ],
    resolve: {
        alias: {}
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: "sourcemap",
    module: {
      noParse: [],
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          },
        },
        {
          test: /\.styl$/,
          //loader: ExtractTextPlugin.extract('style!css?sourceMap!stylus?sourceMap')
          loader: 'style!css!stylus'
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'file?name=imgs/[hash].[ext]',
          include: path.resolve(__dirname, '../app/assets/imgs')
        },
        {
          test: /\.(eot|svg|ttf|woff)$/,
          loader: 'file?name=fonts/[hash].[ext]',
          include: path.resolve(__dirname, '../app/assets/fonts')
        }
      ],
    },
    stylus: {
      use: [
        poststylus(['autoprefixer'])
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new HtmlWebpackPlugin({
        template: './app/assets/index.html'
      })
      // new ExtractTextPlugin("styles.css")
    ]
};

deps.forEach(function (dep) {
 var depPath = path.resolve(node_modules, dep);
 var depName = dep.split(path.sep)[0];
 config.resolve.alias[depName] = depPath;
 if(depName != 'react-dom') {
   config.module.noParse.push(depPath);
 }
});

module.exports = config;

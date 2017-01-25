var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var poststylus = require('poststylus');
var ip = require('ip');

var node_modules = path.resolve(__dirname, '../node_modules');

var myLocalIp = 'http://' + ip.address() + ':3333/';
var basename = '';

var config = {
    entry: [
      'babel-polyfill',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?' + myLocalIp,
      path.resolve(__dirname, '../app/main.js')
    ],
    resolve: {
        alias: {}
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js',
        publicPath: myLocalIp,
        devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },
    debug: true,
    devtool: "eval-source-map",
    module: {
      noParse: [],
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: node_modules,
          loader: 'babel',
          query: {
            plugins: [
              [ 'module-resolver', {
                'root': [path.resolve(__dirname, '../app/')],
              }],
            ]
          },
        },
        {
          test: /\.(styl|css)$/,
          loader: 'style!css?sourceMap!stylus?import=' + path.resolve(__dirname, '../app/style/base.styl'),
        },
        {
          test: /\.json$/,
          loader: 'json',
          include: path.resolve(__dirname, '../app/assets/')
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'file?name=imgs/[hash].[ext]',
          include: path.resolve(__dirname, '../app/assets/imgs')
        },
        {
          test: /\.(eot|svg|ttf|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
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
      new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development'),
        'BASENAME': JSON.stringify(basename),
      },
    }),
      new HtmlWebpackPlugin({
        template: './app/assets/index.html',
        // favicon: './app/assets/imgs/favicon.png',
      })
    ]
};

module.exports = config;

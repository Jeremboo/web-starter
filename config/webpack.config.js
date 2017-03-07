var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var poststylus = require('poststylus');
var ip = require('ip');

var node_modules = path.resolve(__dirname, '../node_modules');

var port = 3333;
var myLocalIp = 'http://' + ip.address() + ':'+ port +'/';
var basename = '';

var config = {
    entry: [
      'babel-polyfill',
      path.resolve(__dirname, '../app/main.js'),
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
    devServer: {
      contentBase: path.resolve(__dirname, '../app'),
      // compress: true,
      host: '0.0.0.0',
      hot: true,
      inline: true,
      port: port,
      historyApiFallback: true,
    },
    externals: {},
    devtool: "eval-source-map", // TODO test cheap-eval-source-map // TODO hidden-source-map in production
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: node_modules,
          loader: 'babel-loader',
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
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              // options: { sourceMap: true },
            },
            {
              loader: 'stylus-loader',
              options: {
                import: path.resolve(__dirname, '../app/style/base.styl'),
              },
            },
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: 'file-loader?name=imgs/[hash].[ext]',
          include: path.resolve(__dirname, '../app/assets/imgs')
        },
        {
          test: /\.(eot|svg|ttf|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'file-loader?name=fonts/[hash].[ext]',
          include: path.resolve(__dirname, '../app/assets/fonts')
        },
        {
          test: /\.pug$/,
          use: 'pug-loader',
          include: path.resolve(__dirname, '../app/views'),
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          stylus: {
            use: [
              poststylus(['autoprefixer'])
            ]
          },
        }
      }),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('development'),
          'BASENAME': JSON.stringify(basename),
        },
      })
    ],
};

// GET PUG FILES
const removeInstanceFromArray = (arr, instance) => {
  const index = arr.indexOf(instance);
  if (index !== -1) arr.splice(index, 1);
  return arr;
};
const pugFiles = fs.readdirSync(path.resolve(__dirname, '../app/views'));
removeInstanceFromArray(pugFiles, '_layout.pug');

// ADD HtmlWebpackPlugin plugins for each pugFiles
for (let i = 0; i < pugFiles.length; i++) {
  config.plugins.push(new HtmlWebpackPlugin({
    filename: pugFiles[i].split('.')[0] + '.html',
    template: path.resolve(__dirname, '../app/views/' + pugFiles[i]),
    // favicon: './app/assets/imgs/favicon.png',
  }));
}

module.exports = config;

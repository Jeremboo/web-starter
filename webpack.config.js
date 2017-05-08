var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var poststylus = require('poststylus');
var ip = require('ip');

var node_modules = path.resolve(__dirname, './node_modules');

var port = 3333;
var ipAdress = ip.address() + ':' + port;
var myLocalIp = 'http://' + ipAdress + '/';
var basename = '';

var nodeEnv = process.env.NODE_ENV;

// ##############
// BASE
var config = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './app/main.js'),
  ],
  resolve: {
    alias: {},
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  externals: {},
  devtool: 'eval-source-map', // TODO test cheap-eval-source-map
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: node_modules,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['module-resolver', {
              root: [path.resolve(__dirname, './app/')],
            }],
          ],
        },
      },
      {
        test: /\.(styl|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'stylus-loader',
            options: {
              import: [
                path.resolve(__dirname, './app/style/variables.styl'),
                path.resolve(__dirname, './app/style/mixins.styl'),
              ],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
        include: path.resolve(__dirname, './app/views'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader?name=imgs/[hash].[ext]',
        include: path.resolve(__dirname, './app/assets/imgs'),
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=fonts/[hash].[ext]',
        include: path.resolve(__dirname, './app/assets/fonts'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
        BASENAME: JSON.stringify(basename),
      },
    }),
  ],
};

// ##############
// GET PUG FILES
const removeInstanceFromArray = (arr, instance) => {
  const index = arr.indexOf(instance);
  if (index !== -1) arr.splice(index, 1);
  return arr;
};
const pugFiles = fs.readdirSync(path.resolve(__dirname, './app/views'));
removeInstanceFromArray(pugFiles, '_layout.pug');

// ADD HtmlWebpackPlugin plugins for each pugFiles
for (let i = 0; i < pugFiles.length; i++) {
  config.plugins.push(new HtmlWebpackPlugin({
    filename: pugFiles[i].split('.')[0] + '.html',
    template: path.resolve(__dirname, './app/views/' + pugFiles[i]),
    // favicon: './app/assets/imgs/favicon.png',
  }));
}

var loaderOptions = {
  debug: false,
  minimize: true,
  options: {
    stylus: {
      use: [poststylus(['autoprefixer'])],
    },
  },
};

// ##############
// DEVELOPMENT
if (nodeEnv === 'development') {
  config.output.publicPath = myLocalIp;
  config.output.devtoolModuleFilenameTemplate = 'webpack:///[absolute-resource-path]';
  config.devServer = {
    // compress: true,
    contentBase: path.resolve(__dirname, './app'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    port: port,
    // Release of webpack-dev-server 2.4.3 => https://github.com/webpack/webpack-dev-server/issues/882
    public: ipAdress,
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  loaderOptions.debug = true;
  loaderOptions.minimize = false;


// ##############
// PRODUCTION
} else if (nodeEnv === 'production') {
  config.output.publicPath = basename;
  config.devtool = 'hidden-source-map';

  // Add ExtractTextPlugin to css|styl files
  var cssRule = config.module.rules[1];
  if (cssRule.use[0] !== 'style-loader') {
    console.log('ERROR: cssRule is not the good');
    return;
  }
  var use = {
    fallback: 'style-loader',
    use: cssRule.use.splice(1),
  };
  cssRule.use = ExtractTextPlugin.extract(use);

  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: true, drop_console: true },
      comments: false,
      sourceMap: true,
      mangle: true,
    }),
    new ExtractTextPlugin('style.css'),
  ]);
}

config.plugins.push(
  new webpack.LoaderOptionsPlugin(loaderOptions)
);

module.exports = config;

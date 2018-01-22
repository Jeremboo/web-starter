var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var poststylus = require('poststylus');
var ip = require('ip');

var node_modules = path.resolve(__dirname, '../node_modules');

var port = 3333;
var ipAdress = ip.address() + ':' + port;
var myLocalIp = 'http://' + ipAdress + '/';
var basename = '';

module.exports = {
    entry: [
      'babel-polyfill',
      path.resolve(__dirname, '../app/main.js')
    ],
    resolve: {
      alias: {},
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: '[name].js',
        publicPath: myLocalIp,
        devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
    devtool: "eval-source-map",
    devServer: {
      // compress: true,
      contentBase: path.resolve(__dirname, '../app'),
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: true,
      disableHostCheck: true,
      host: '0.0.0.0',
      hot: true,
      inline: true,
      port: port,
      // Release of webpack-dev-server 2.4.3 => https://github.com/webpack/webpack-dev-server/issues/882
      public: ipAdress,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, '../app/'),
          loader: 'babel-loader',
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
                  path.resolve(__dirname, '../node_modules/@ardentic/stylus-mq/mq.styl'),
                  path.resolve(__dirname, '../app/style/variables.styl'),
                  path.resolve(__dirname, '../app/style/mixins.styl'),
                ],
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          include: path.resolve(__dirname, '../app/assets/')
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: 'file-loader?name=imgs/[name].[ext]',
          include: path.resolve(__dirname, '../app/assets/imgs'),
        },
        {
          test: /\.(eot|svg|ttf|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'file-loader?name=fonts/[name].[ext]',
          include: path.resolve(__dirname, '../app/assets/fonts'),
        },
        {
          test: /\.pdf$/,
          loader: 'file?name=[name].[ext]',
          include: path.resolve(__dirname, '../app/assets')
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          stylus: {
            use: [poststylus(['autoprefixer'])],
          },
        },
      }),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('development'),
          'BASENAME': JSON.stringify(basename),
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../app/assets/index.html'),
        favicon: path.resolve(__dirname, '../app/assets/imgs/favicon.ico'),
      }),
    ]
};

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = path.resolve(__dirname, 'app/www');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/app/main')
  ],
  output: {
    contentBase: 'app/www',
    path: buildPath,
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, '/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app'),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  eslint: {
    configFile: '../.eslintrc',
  },
};

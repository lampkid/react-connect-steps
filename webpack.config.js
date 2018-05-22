var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var webpack = require('webpack');

module.exports = {
  entry: {
    build: ['./examples/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'demo',
      template: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devtool: 'source-map',
  
  
};

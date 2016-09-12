import webpack from 'webpack'
import path from 'path'
import GalleryPlugin from './src/gallery-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 8080
  },
  module: {
    noParse: [
      /\.md$/
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.gif$|\.png$|\.jpg$/,//"png|jpg|jpeg|gif|svg",
        loader: 'url-loader?limit=10000'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new GalleryPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: __dirname
  },
  node: {
   fs: "empty"
  }
}
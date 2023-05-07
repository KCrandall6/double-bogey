const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: './dev.html' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/favicon.ico', to: 'favicon.ico' },
        { from: 'public/logo192.png', to: 'logo192.png' },
        { from: 'public/logo512.png', to: 'logo512.png' },
      ],
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                process.env.NODE_ENV === 'production'
                  ? MiniCssExtractPlugin.loader
                  : 'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(jsx?)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
          {
            test: /\.sass$/i,
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ],
          }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
      secure: true,
    },
    static: {
      directory: path.join(__dirname, '/'),
      publicPath: '/',
    },
  },
};

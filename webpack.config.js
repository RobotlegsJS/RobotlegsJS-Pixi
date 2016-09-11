const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (function(options) {
  return {
    entry: {
      main: (process.env.EXAMPLE)
        ? path.resolve("example/index.ts")
        : path.resolve("src/index.ts")
    },

    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },

    devtool: 'source-map',

    module: {
      loaders: [
        { test: /\.ts$/, loader: "awesome-typescript-loader" },
        { test: /node_modules\/pixi\.js/, loader: 'ify' },
      ]
    },

    plugins: (process.env.EXAMPLE)
      ? [ new HtmlWebpackPlugin() ]
      : [],

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      root: [ path.join(__dirname, "./node_modules"), path.join(__dirname, "./src") ]
    }

  }
})()

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (function(options) {
  return {
    entry: {
      main: path.resolve("example/index.ts")
    },

    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },

    devtool: 'source-map',

    module: {
      rules: [
        { test: /\.ts$/, loader: "awesome-typescript-loader" },
        { test: /node_modules\/pixi\.js/, loader: 'ify' },
      ]
    },

    plugins: [ new HtmlWebpackPlugin() ],

    resolve: {
      extensions: ['.ts', '.js', '.json']
    }

  }
})();

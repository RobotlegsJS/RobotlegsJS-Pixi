const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SimpleProgressPlugin = require("webpack-simple-progress-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = options => {
  return {
    mode: "development",

    entry: {
      main: path.resolve("example/index.ts")
    },

    output: {
      path: __dirname + "/dist",
      filename: "game.[hash].js"
    },

    devtool: "source-map",

    module: {
      rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    },

    plugins: [
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        template: path.resolve("static/index.html"),
        inject: false
      }),

      new SimpleProgressPlugin()
    ],

    resolve: {
      extensions: [".ts", ".js", ".json"]
    },

    devServer: {
      host: "0.0.0.0",
      contentBase: path.join(__dirname, "static"),
      hot: true,
      disableHostCheck: true,
      inline: false
    }
  };
};

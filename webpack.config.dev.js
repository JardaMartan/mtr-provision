const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EventHooksPlugin = require("event-hooks-webpack-plugin");
const fs = require("fs-extra");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    // stats: "minimal",
    // overlay: true,
    historyApiFallback: true,
    // disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
    port: 4000,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://192.168.101.127:4001"),
      "process.env.ROOT_URL": JSON.stringify("/"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
    new EventHooksPlugin({
      afterPlugins: (compilation, done) => {
        console.log(
          "Copying webpackConfig.localhost.json file to webpackConfig.json"
        );
        fs.copy(
          "src/api/webexConfig.localhost.json",
          "src/api/webexConfig.json",
          done
        );
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "eval-cheap-source-map",
  output: {
    path: path.join(__dirname, "dist", "assets"),
    filename: "bundle.js",
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "index.html" })],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
};

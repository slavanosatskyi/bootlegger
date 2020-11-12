const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: 'images/[name][ext]'
  },
  devtool: "inline-source-map",
  devServer: {
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
      new HtmlWebpackPlugin({template: "./index.html"}),
      new HtmlWebpackPlugin({
          template: "./wiki.html",
          filename: "wiki.html"
        }),
      new CleanWebpackPlugin()
    ]
};

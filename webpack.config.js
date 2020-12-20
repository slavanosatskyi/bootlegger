const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development", 
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    assetModuleFilename: "images/[name][ext]",
  },
  devtool: "inline-source-map",
  devServer: {
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      vm: require.resolve("vm-browserify"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      constants: require.resolve("constants-browserify"),
    },
  },
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = (env) => {
  return {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "docs"),
      publicPath: env.NODE_ENV === "production" ? "bootleger/" : "/",
      filename: "bundle.js",
      assetModuleFilename: "images/[name][ext]",
    },
    devtool: "inline-source-map",
    devServer: {
      open: true,
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { useBuiltIns: "usage" }],
                ["@babel/preset-react"],
              ],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./index.html" }),
      new CleanWebpackPlugin(),
    ],
  };
};

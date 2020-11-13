const path = require("path");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(
  {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      hot: true, // 启用热更新
      port: 3000,
      open: true,
      contentBase: "./dist",
      compress: true,
    },
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, "dist", "dll", "manifest.json"),
      }),
      new AddAssetHtmlPlugin([
        {
          filepath: path.resolve(__dirname, "./dist/dll/_dll_libs.js"),
        },
      ]),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
  common
);

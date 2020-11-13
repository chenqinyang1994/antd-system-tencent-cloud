const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const common = require("./webpack.common.js");

module.exports = merge(
  {
    mode: "production",
    // devtool: "source-map",
    output: {
      filename: "static/js/[name].js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd",
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true, // 是否缓存
          parallel: true, // 是否并行打包
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
          cssProcessorPluginOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"], //不删除dll目录
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //   new FriendlyErrorsWebpackPlugin(),
    //   function() {
    //       this.hooks.done.tap('done', (stats)=>{
    //           console.log('stats build success');
    //           process.exit(123)
    //       })
    //   }
    ],
  },
  common
);

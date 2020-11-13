const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const smp = new SpeedMeasurePlugin();
const common = require("./webpack.common.js");

const cacheGroups = {
  libs: {
    name: "libs",
    priority: 100,
    minChunks: 1,
    reuseExistingChunk: true,
    test: new RegExp(
      `[\\\\/]node_modules[\\\\/](${[
        // react
        "react",
        "react-dom",
        // "react-redux",
        // "react-router",
        // "react-router-redux",
        // "redux",
        // "redux-thunk",
        // babel, webpack & other tools
        // 'regenerator-runtime',
        // common libraries
        // 'axios',
        // 'classnames',
        // 'history',
        // 'js-cookie',
        // 'lodash',
        // 'underscore'
      ].join("|")})[\\\\/]`
    ),
  },
  libsAntd: {
    name: "libs-ant-design-related",
    priority: 90,
    minChunks: 1,
    reuseExistingChunk: true,
    test: new RegExp(
      `[\\\\/]node_modules[\\\\/](${[
        "@ant-design",
        "antd",
        "moment",
        // "rc-align",
        // "rc-animate",
        // "rc-calendar",
        // "rc-checkbox",
        // "rc-form",
        // "rc-menu",
        // "rc-notification",
        // "rc-pagination",
        // "rc-progress",
        // "rc-resize-observer",
        // "rc-select",
        // "rc-tabs",
        // "rc-tooltip",
        // "rc-trigger",
        // "rc-upload",
        // "rc-util",
      ].join("|")})[\\\\/]`
    ),
  },
  libsOthers: {
    name: "libs-others",
    priority: 10,
    minChunks: 2,
    reuseExistingChunk: true,
  },
};

module.exports = merge(
  {
    mode: "production",
    // devtool: "source-map",
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
      //   splitChunks: {
      //     maxAsyncRequests: 8,
      //     maxInitialRequests: 6,

      //     cacheGroups,
      //   },
      //   runtimeChunk: {
      //     name: (entrypoint) => `runtime-${entrypoint.name}`,
      //   },
      splitChunks: {
        minSize: 30, //提取出的chunk的最小大小
        cacheGroups: {
          default: {
            name: "common",
            chunks: "initial",
            minChunks: 2, //模块被引用2次以上的才抽离
            priority: -20,
          },
          vendors: {
            //拆分第三方库（通过npm|yarn安装的库）
            test: /node_modules/,
            name: "vendor~common",
            chunks: "initial",
            priority: -10,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            name: "vendor~react",
            chunks: "initial",
            priority: -5,
          },
          antd: {
            test: new RegExp(
              `[\\\\/]node_modules[\\\\/](${[
                "@ant-design",
                "antd",
                "moment",
                "rc-animate",
                "rc-cascader",
                "rc-checkbox",
                "rc-collapse",
                "rc-dialog",
                "rc-drawer",
                "rc-dropdown",
                "rc-field-form",
                "rc-image",
                "rc-input-number",
                "rc-mentions",
                "rc-menu",
                "rc-motion",
                "rc-notification",
                "rc-pagination",
                "rc-picker",
                "rc-progress",
                "rc-rate",
                "rc-resize-observer",
                "rc-select",
                "rc-slider",
                "rc-steps",
                "rc-switch",
                "rc-table",
                "rc-tabs",
                "rc-textarea",
                "rc-tooltip",
                "rc-tree",
                "rc-tree-select",
                "rc-trigger",
                "rc-upload",
                "rc-util",
              ].join("|")})[\\\\/]`
            ),
            name: "vendor~antd",
            chunks: "initial",
            priority: -5,
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"], //不删除dll目录
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new BundleAnalyzerPlugin(),
    ],
  },
  common
);
